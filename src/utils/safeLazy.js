import { lazy as reactLazy } from 'react';
import { logWarning, logChunkError } from './logger';
import {
  checkVersionAndRecover,
  isChunkError,
  isReloadCoolingDown,
} from './versionCheck';

/**
 * Retry configuration.
 * 4 attempts: 500ms → 1000ms → 2000ms → (max 3000ms) before giving up.
 */
const RETRY_ATTEMPTS  = 2;
const RETRY_DELAY_MS  = 200;
const RETRY_DELAY_CAP = 1_000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * In-flight registry — maps each importFn reference to a shared Promise.
 * Prevents the same chunk from being fetched N times concurrently when
 * the global error handler and safeLazy both react to the same failure.
 */
const inFlight = new WeakMap();

/**
 * Global deduplication flag set by main.jsx global error handlers.
 * When safeLazy self-heals a chunk error, it sets this flag so the
 * global window event handler knows not to fire checkVersionAndRecover
 * for the same error.
 */
const setHandledFlag = () => {
  try {
    window.__aindhin_chunkHandled = Date.now();
  } catch { /* SSR guard */ }
};

/**
 * Extracts the raw asset path from a dynamic import function's source string.
 * Works with both the literal import() path and Vite's compiled __vitePreload wrapper.
 */
const extractUrl = (fn) => {
  try {
    const str = fn.toString();
    // Match quoted path strings ending in .js
    const m = str.match(/["'`]([^"'`]+\.js)["'`]/);
    if (!m?.[1]) return null;
    let url = m[1];
    // If it's a relative path like "./AiMlCourse-xxxx.js", ensure it maps under /assets/
    if (url.startsWith('./') && !url.startsWith('./assets/')) {
      url = '/assets/' + url.slice(2);
    }
    return url;
  } catch {
    return null;
  }
};

/**
 * Fetches a JS asset and validates it is not an HTML SPA fallback.
 * FTP hosts commonly return index.html for missing chunk paths — this check
 * catches that before attempting a cache-busted re-import.
 */
const validateAsset = async (url) => {
  const res = await fetch(url, { method: 'GET', cache: 'no-store' });
  if (!res.ok) throw new Error(`Asset ${url} → HTTP ${res.status}`);

  const ct = res.headers.get('content-type') || '';
  if (ct.includes('text/html')) {
    throw new Error(`Asset ${url} returned HTML (SPA 404 fallback) — chunk missing on server`);
  }

  // Fallback body inspection for misconfigured servers that send text/html
  // without the correct content-type header
  const text = await res.text();
  const trimmed = text.trimStart();
  if (trimmed.startsWith('<') || trimmed.toLowerCase().startsWith('<!doctype')) {
    throw new Error(`Asset ${url} body is HTML — chunk not yet uploaded`);
  }
};

/**
 * Retries a dynamic import with exponential backoff and optional cache-busting.
 *
 * Strategy per attempt:
 *   Attempt 1: standard importFn() — uses browser module cache
 *   Attempt 2: cache-busted URL re-import via @vite-ignore — bypasses module cache
 *   Attempt 3: sleep + standard importFn() again (for transient network blips)
 *   Attempt 4: sleep + standard importFn() again (last chance)
 */
const retryImport = async (importFn, attempt = 1, delay = RETRY_DELAY_MS) => {
  try {
    const module = await importFn();
    if (attempt > 1) {
      logWarning(`safeLazy: import succeeded on attempt ${attempt}.`);
    }
    return module;
  } catch (error) {
    if (attempt >= RETRY_ATTEMPTS) {
      // All retries exhausted — propagate
      throw error;
    }

    logWarning(
      `safeLazy: import attempt ${attempt}/${RETRY_ATTEMPTS} failed — retrying in ${delay}ms.`,
      { extra: { error: error.message || String(error) } }
    );

    // On attempt 2, try a cache-busted direct fetch + re-import
    if (attempt === 2) {
      try {
        const rawUrl = extractUrl(importFn);
        if (rawUrl) {
          const abs    = new URL(rawUrl, window.location.origin).href;
          const busted = `${abs}${abs.includes('?') ? '&' : '?'}retry_t=${Date.now()}`;
          await validateAsset(busted);
          // @vite-ignore prevents Vite from trying to statically analyse this import
          return await import(/* @vite-ignore */ busted);
        }
      } catch (retryErr) {
        logWarning('safeLazy: cache-busted re-import failed; falling back to timed retry.', {
          extra: { error: retryErr.message },
        });
      }
    }

    await sleep(Math.min(delay, RETRY_DELAY_CAP));
    return retryImport(importFn, attempt + 1, delay * 2);
  }
};

/**
 * safeLazy — production-grade wrapper around React.lazy().
 *
 * Guarantees:
 *  1. Retries failed imports up to RETRY_ATTEMPTS times with backoff.
 *  2. Deduplicates concurrent import() calls for the same chunk.
 *  3. Validates that the loaded module has a valid `.default` export
 *     (guards against receiving index.html instead of a JS module).
 *  4. On persistent chunk errors, checks if a new deployment is available
 *     and reloads automatically — but only if not already in cooldown.
 *  5. Sets a global flag so the window-level error handlers in main.jsx
 *     don't double-fire checkVersionAndRecover for the same event.
 *
 * @param {function} importFn   Arrow function returning a dynamic import promise.
 *                              Must match what React.lazy() expects.
 */
export const safeLazy = (importFn) => {
  return reactLazy(async () => {
    // Deduplicate: if this exact importFn is already in-flight, share its promise
    if (inFlight.has(importFn)) {
      return inFlight.get(importFn);
    }

    const promise = (async () => {
      try {
        const module = await retryImport(importFn);

        // Guard against receiving index.html masquerading as a JS module.
        // The `.default` will be `undefined` or a string (HTML) in that case.
        if (
          !module ||
          typeof module !== 'object' ||
          !('default' in module) ||
          module.default === undefined ||
          module.default === null
        ) {
          throw new TypeError(
            "Module loaded but has no valid 'default' export — " +
            'chunk may be corrupted or server returned an HTML page.'
          );
        }

        // Success — signal to the global handlers that this import self-healed
        setHandledFlag();
        return module;

      } catch (error) {
        logChunkError(error, { tags: { context: 'safeLazy_import' } });

        if (isChunkError(error)) {
          // Signal that safeLazy is handling this — prevents main.jsx handlers
          // from firing checkVersionAndRecover for the same error in parallel
          setHandledFlag();

          // If we haven't already attempted a recovery reload for this path in this session,
          // reload once immediately to fetch fresh HTML and new chunk hashes from the server.
          const chunkReloadKey = 'aindhin_chunk_reload_' + window.location.pathname;
          let hasReloaded = false;
          try {
            hasReloaded = Boolean(sessionStorage.getItem(chunkReloadKey));
          } catch { /* ignore */ }

          if (!hasReloaded && !isReloadCoolingDown()) {
            try {
              sessionStorage.setItem(chunkReloadKey, '1');
              logWarning('safeLazy: chunk missing (new deployment detected). Performing automatic reload.');
              const url = new URL(window.location.href);
              url.searchParams.set('reload_t', Date.now().toString());
              window.location.replace(url.toString());
              return new Promise(() => {}); // Hold until browser completes reload
            } catch (e) {
              window.location.reload();
              return new Promise(() => {});
            }
          }

          // If we're already in the reload cooldown window, reject immediately
          // so RecoveryBoundary shows its fallback UI rather than hanging
          if (isReloadCoolingDown()) {
            logWarning('safeLazy: chunk error during cooldown — surfacing to RecoveryBoundary.', {
              extra: { error: error.message },
            });
            throw error;
          }

          // Otherwise: check for a new deployment and reload if one is found.
          // Returns a promise that either resolves (after page reload) or
          // rejects (no version mismatch) so RecoveryBoundary takes over.
          return new Promise((resolve, reject) => {
            checkVersionAndRecover(() => {
              // onNoMismatch: no new deployment detected — surface the error
              logWarning('safeLazy: chunk error with no version mismatch — surfacing to RecoveryBoundary.');
              reject(error);
            });
            // If checkVersionAndRecover triggers a reload, this promise hangs
            // (which is intentional — the page reloads before it can reject)
          });
        }

        // Non-chunk error — propagate immediately
        throw error;
      } finally {
        inFlight.delete(importFn);
      }
    })();

    inFlight.set(importFn, promise);
    return promise;
  });
};

export default safeLazy;

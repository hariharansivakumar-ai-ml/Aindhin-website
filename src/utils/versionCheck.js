import { logWarning } from './logger';

/**
 * Single authoritative localStorage key used by ALL consumers (safeLazy, RecoveryBoundary,
 * ErrorBoundary, main.jsx). Previously each used a hard-coded string which allowed multiple
 * independent cooldown timers to fire in sequence after a single deployment.
 */
export const RELOAD_KEY = 'aindhin_deploy_reload_at';

/**
 * How long (ms) to suppress additional reload attempts after one has fired.
 * Set to 90s — long enough to cover a full FTP upload cycle (typically 1–2 min).
 * Previously 30s, which caused a second "Persistent chunk load failure" error
 * when the FTP upload hadn't finished within the cooldown window.
 */
const RELOAD_COOLDOWN_MS = 90_000;

/**
 * Returns the application version baked in at build time by buildVersionPlugin().
 * Falls back to 'development' so version checks are safely skipped in dev mode.
 */
export const getRunningVersion = () => {
  try {
    return __APP_VERSION__;
  } catch (e) {
    return 'development';
  }
};

/**
 * Fetches the version.json currently on the server.
 * Uses cache: 'no-store' and a timestamp query param to bypass every caching layer
 * (CDN, service worker, browser disk cache, etc.).
 */
export const fetchServerVersion = async () => {
  try {
    const res = await fetch(`/version.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-store' },
    });
    if (res.ok) {
      const data = await res.json();
      return data; // { version, entry, buildTime, chunkCount }
    }
  } catch (err) {
    logWarning('Failed to fetch server version.json', {
      extra: { error: err.message || String(err) },
    });
  }
  return null;
};

/**
 * Unified pattern list for chunk / module load failures.
 * Centralised here so safeLazy, RecoveryBoundary, and main.jsx all use
 * the exact same detection logic — no more divergent string-matching.
 */
export const isChunkError = (error) => {
  if (!error) return false;
  const message = typeof error === 'string' ? error : (error.message || String(error));
  const name    = error.name || '';

  return (
    name === 'ChunkLoadError'                                     ||
    message.includes('Failed to fetch')                          ||
    message.includes('Loading chunk')                            ||
    message.includes('Loading CSS chunk')                        ||
    message.includes('imported module')                          ||
    message.includes('loading dynamically')                      ||
    message.includes("missing 'default' export")                 ||
    message.includes("Unexpected token '<'")                     ||
    message.includes("expected expression, got '<'")             ||
    message.includes('Failed to parse SourceMap')                ||
    message.includes('error loading dynamically imported module') ||
    // TypeError: Cannot read properties of undefined (reading 'default')
    // Happens when a stale/partial chunk returns HTML instead of JS
    (message.includes('Cannot read properties of undefined') &&
     message.includes("reading 'default'"))                      ||
    message.includes("reading 'default'")                        ||
    message.includes("TypeError: Failed to fetch")               ||
    // Vite preload directive error
    message.includes('Unable to preload CSS')                    ||
    message.includes('net::ERR_ABORTED')
  );
};

/**
 * Returns true if a reload was triggered recently (within RELOAD_COOLDOWN_MS).
 * Used by all consumers to avoid infinite reload loops.
 */
export const isReloadCoolingDown = () => {
  try {
    const last = localStorage.getItem(RELOAD_KEY);
    return last && (Date.now() - parseInt(last, 10) < RELOAD_COOLDOWN_MS);
  } catch {
    return false;
  }
};

/**
 * Records the current timestamp as the last reload attempt.
 * Call this BEFORE triggering window.location.replace / reload.
 */
export const markReloadAttempt = () => {
  try {
    localStorage.setItem(RELOAD_KEY, Date.now().toString());
  } catch {
    /* localStorage unavailable — private browsing, etc. */
  }
};

/**
 * Clears the reload cooldown so the next chunk failure triggers a fresh recovery attempt.
 * Call this after a SUCCESSFUL full-page load to reset the circuit breaker.
 */
export const clearReloadCooldown = () => {
  try {
    localStorage.removeItem(RELOAD_KEY);
  } catch {
    /* ignore */
  }
};

/**
 * Performs a hard cache-busted navigation to the current URL.
 * Appends ?t=<timestamp> which forces the server to serve a fresh response
 * even if the browser has a cached index.html.
 */
const triggerHardReload = () => {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('t', Date.now().toString());
    window.location.replace(url.toString());
  } catch {
    window.location.reload();
  }
};

/**
 * Core recovery function called from safeLazy, RecoveryBoundary, and the global
 * error handlers in main.jsx.
 *
 * Flow:
 *   1. Skip if running in development.
 *   2. Skip if already reloaded within the cooldown window (loop prevention).
 *   3. Fetch server version.json.
 *   4. If server version differs from running version → verify the new entry asset
 *      is fully uploaded → mark + trigger hard reload.
 *   5. If no mismatch or assets not yet uploaded → call onNoMismatch().
 *
 * @param {function} onNoMismatch  Called when no actionable version difference is found.
 *                                 Use this to show error UI or propagate the error.
 */
export const checkVersionAndRecover = async (onNoMismatch = () => {}) => {
  const running = getRunningVersion();

  // Never auto-reload in development — would create an annoying dev loop
  if (running === 'development') {
    onNoMismatch();
    return;
  }

  // Circuit breaker: suppress reload if one already fired in the last 90s
  if (isReloadCoolingDown()) {
    logWarning('checkVersionAndRecover: reload suppressed — already reloaded within cooldown window.', {
      extra: { running, cooldownMs: RELOAD_COOLDOWN_MS },
    });
    onNoMismatch();
    return;
  }

  const serverData    = await fetchServerVersion();
  const serverVersion = serverData?.version;
  const entryAsset    = serverData?.entry;

  if (!serverVersion || serverVersion === running) {
    // No detectable version difference — could be a transient network error
    logWarning('checkVersionAndRecover: no version mismatch detected.', {
      extra: { running, serverVersion },
    });
    onNoMismatch();
    return;
  }

  // Version mismatch confirmed — verify the new entry JS is actually accessible
  // (guards against triggering a reload mid-upload when assets don't exist yet)
  let isUploaded = true;
  if (entryAsset) {
    try {
      const cacheBusted = `${entryAsset}${entryAsset.includes('?') ? '&' : '?'}t=${Date.now()}`;
      const check = await fetch(cacheBusted, { method: 'GET', cache: 'no-store' });
      if (check.ok) {
        const ct = check.headers.get('content-type') || '';
        if (ct.includes('text/html')) {
          // Server returned the SPA 404 fallback → asset not yet uploaded
          isUploaded = false;
        }
      } else {
        isUploaded = false;
      }
    } catch {
      isUploaded = false;
    }
  }

  if (isUploaded) {
    logWarning('checkVersionAndRecover: version mismatch + assets verified → reloading.', {
      extra: { running, server: serverVersion, entryAsset },
    });
    markReloadAttempt();
    triggerHardReload();
  } else {
    logWarning('checkVersionAndRecover: version mismatch but assets not yet fully uploaded. Deferring reload.', {
      extra: { running, server: serverVersion, entryAsset },
    });
    onNoMismatch();
  }
};

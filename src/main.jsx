import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { initLogger, logError, logWarning } from './utils/logger'
import {
  checkVersionAndRecover,
  isChunkError,
  clearReloadCooldown,
} from './utils/versionCheck'

// Initialize the unified telemetry logging system (with Sentry support)
initLogger();

// Clear the reload cooldown on a successful full-page load.
// This resets the circuit breaker so the NEXT deployment can trigger a fresh recovery.
// We wait for the window 'load' event to ensure all chunks have actually loaded
// successfully before clearing the flag.
window.addEventListener('load', () => {
  clearReloadCooldown();
}, { once: true });

/**
 * Global chunk/module load failure handler.
 *
 * Design decisions:
 *
 * 1. DEBOUNCE (100ms): safeLazy's retryImport runs before this handler can
 *    check the version. The 100ms delay gives safeLazy time to self-heal
 *    the import on a transient network blip, before we fire an async version
 *    check that might trigger a full-page reload unnecessarily.
 *
 * 2. DEDUPLICATION FLAG: safeLazy sets window.__aindhin_chunkHandled when it
 *    takes ownership of a chunk error. If the flag is fresh (<200ms old), we
 *    skip calling checkVersionAndRecover here to avoid two parallel calls
 *    competing for the same reload decision.
 *
 * 3. IN-PROGRESS GUARD: a simple boolean prevents re-entrant calls when multiple
 *    chunk errors fire simultaneously (e.g., multiple lazy routes in a Suspense tree).
 */
(function installGlobalChunkHandlers() {
  let versionCheckInProgress = false;

  /**
   * Returns true if safeLazy has already taken ownership of this error
   * within the last 200ms — prevents double-firing.
   */
  const isSafeLazyHandling = () => {
    try {
      const ts = window.__aindhin_chunkHandled;
      return typeof ts === 'number' && (Date.now() - ts) < 200;
    } catch {
      return false;
    }
  };

  /**
   * Core handler — debounced 100ms to let safeLazy self-heal first.
   */
  const handleChunkLoadError = (source, rawError) => {
    setTimeout(async () => {
      // Skip if safeLazy already handled this exact error
      if (isSafeLazyHandling()) {
        logWarning(`Global handler: chunk error from "${source}" already handled by safeLazy — skipping.`);
        return;
      }

      // Skip if a version check is already running
      if (versionCheckInProgress) {
        logWarning(`Global handler: version check already in progress — skipping duplicate from "${source}".`);
        return;
      }

      logWarning(`Global error handler: chunk/module load failure intercepted from "${source}".`, {
        tags:  { type: 'chunk_failure_interception', source },
        extra: { rawError: rawError?.message || String(rawError) },
      });

      versionCheckInProgress = true;
      try {
        await checkVersionAndRecover(() => {
          logWarning(
            `Global handler: checkVersionAndRecover found no version mismatch after "${source}". ` +
            'RecoveryBoundary will handle the UI fallback.',
            { extra: { source } }
          );
        });
      } finally {
        versionCheckInProgress = false;
      }
    }, 100); // 100ms debounce — gives safeLazy's retryImport() time to self-heal
  };

  // ── 1. Vite preload directive failures ──────────────────────────────────────
  // Fires when Vite's <link rel="modulepreload"> cannot fetch a chunk
  // (e.g., the old hash no longer exists after a fresh deployment).
  window.addEventListener('vite:preloadError', (event) => {
    const reloadKey = 'vite_preload_reloaded_' + window.location.pathname;
    let hasReloaded = false;
    try {
      hasReloaded = Boolean(sessionStorage.getItem(reloadKey));
    } catch { /* ignore */ }

    if (!hasReloaded) {
      try {
        sessionStorage.setItem(reloadKey, '1');
        window.location.reload();
        return;
      } catch { /* ignore */ }
    }

    handleChunkLoadError('vite:preloadError', event?.payload || event);
    event.preventDefault?.();
  });

  // ── 2. Unhandled promise rejections from dynamic import() ──────────────────
  // Fires when React.lazy() / safeLazy's import promise rejects and nothing
  // catches it at the Suspense boundary level yet.
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason || {};
    if (isChunkError(error)) {
      handleChunkLoadError('unhandledrejection', error);
      event.preventDefault();
    }
  });

  // ── 3. Script/stylesheet resource load errors ───────────────────────────────
  // Catches <script src="…"> and <link href="…"> failures that don't surface
  // as promise rejections (e.g., dynamically injected script tags).
  window.addEventListener('error', (event) => {
    const target = event.target || {};
    if (target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
      const url = target.src || target.href || '';
      if (url.includes('/assets/')) {
        const syntheticError = event.error || new Error(`Resource load failed: ${url}`);
        handleChunkLoadError(`resource:${target.tagName}`, syntheticError);
        event.preventDefault?.();
      }
    }
  }, true); // Capture phase — fires before bubbling, catches resource errors

})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

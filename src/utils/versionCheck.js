import { logWarning } from './logger';

/**
 * Returns the application version defined at build time.
 * In development, defaults to 'development'.
 */
export const getRunningVersion = () => {
  try {
    return __APP_VERSION__;
  } catch (e) {
    return 'development';
  }
};

/**
 * Fetches the version metadata currently deployed on the server.
 * Cache-busted to ensure we bypass CDN and browser caching.
 */
export const fetchServerVersion = async () => {
  try {
    const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data; // Returns { version, entry }
    }
  } catch (err) {
    logWarning('Failed to fetch server version file', { extra: { error: err.message || err } });
  }
  return null;
};

/**
 * Helper to check if a specific chunk is chunk error related.
 */
export const isChunkError = (error) => {
  if (!error) return false;
  const message = error.message || String(error);
  const name = error.name || '';
  return (
    name === 'ChunkLoadError' ||
    message.includes('Failed to fetch') ||
    message.includes('Loading chunk') ||
    message.includes('imported module') ||
    message.includes('loading dynamically') ||
    message.includes("missing 'default' export") ||
    message.includes("Unexpected token '<'") ||
    message.includes("expected expression, got '<'") ||
    message.includes("Failed to parse SourceMap") ||
    message.includes("error loading dynamically imported module")
  );
};

/**
 * Checks if the running version differs from the server version.
 * If yes, verifies if the new version's entry asset is uploaded on the server.
 * If verified, triggers a hard page reload with a cache-busted timestamp.
 * If not, executes the fallback callback.
 */
export const checkVersionAndRecover = async (onNoMismatch = () => {}) => {
  const running = getRunningVersion();
  if (running === 'development') {
    onNoMismatch();
    return;
  }

  const serverData = await fetchServerVersion();
  const serverVersion = serverData?.version;
  const entryAsset = serverData?.entry;

  if (serverVersion && serverVersion !== running) {
    let isUploaded = true;
    if (entryAsset) {
      try {
        const cacheBustedEntry = `${entryAsset}${entryAsset.includes('?') ? '&' : '?'}t=${Date.now()}`;
        const checkRes = await fetch(cacheBustedEntry, { method: 'GET', cache: 'no-store' });
        if (checkRes.ok) {
          const contentType = checkRes.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            // Asset URL returned HTML (the SPA 404 fallback page), meaning upload is incomplete
            isUploaded = false;
          }
        } else {
          isUploaded = false;
        }
      } catch (err) {
        isUploaded = false;
      }
    }

    if (isUploaded) {
      logWarning('Version mismatch detected and new assets verified! Triggering page reload...', {
        extra: { running, server: serverVersion, entryAsset }
      });
      
      try {
        const now = Date.now();
        localStorage.setItem('aindhin_chunk_reload', now.toString());
        
        const url = new URL(window.location.href);
        url.searchParams.set('t', now.toString());
        window.location.replace(url.toString());
      } catch (e) {
        window.location.reload();
      }
    } else {
      logWarning('Version mismatch detected, but new assets are not fully uploaded/visible yet. Deferring reload.', {
        extra: { running, server: serverVersion, entryAsset }
      });
      onNoMismatch();
    }
  } else {
    // No version mismatch or fetch failed, execute fallback logic
    onNoMismatch();
  }
};

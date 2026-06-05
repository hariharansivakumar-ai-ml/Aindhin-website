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
 * Fetches the version currently deployed on the server.
 * Cache-busted to ensure we bypass CDN and browser caching.
 */
export const fetchServerVersion = async () => {
  try {
    const res = await fetch(`/version.json?t=${Date.now()}`);
    if (res.ok) {
      const data = await res.json();
      return data.version;
    }
  } catch (err) {
    logWarning('Failed to fetch server version file', { extra: { error: err.message || err } });
  }
  return null;
};

/**
 * Checks if the running version differs from the server version.
 * If yes, triggers a hard page reload with a cache-busted timestamp to pull the latest bundles.
 * If no, executes the fallback callback (e.g. throwing error to trigger Error Boundary).
 */
export const checkVersionAndRecover = async (onNoMismatch = () => {}) => {
  const running = getRunningVersion();
  if (running === 'development') {
    onNoMismatch();
    return;
  }

  const server = await fetchServerVersion();
  if (server && server !== running) {
    logWarning('Version mismatch detected! Triggering page reload for upgrade...', {
      extra: { running, server }
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
    // No version mismatch or fetch failed, execute fallback logic
    onNoMismatch();
  }
};

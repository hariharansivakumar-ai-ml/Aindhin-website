import * as Sentry from '@sentry/react';

let isSentryInitialized = false;

/**
 * Initialize Sentry telemetry logger.
 * Falls back gracefully to standard console logging if no DSN is provided.
 */
export const initLogger = (dsn = import.meta.env.VITE_SENTRY_DSN, environment = import.meta.env.MODE) => {
  if (dsn) {
    try {
      Sentry.init({
        dsn,
        environment,
        integrations: [
          Sentry.browserTracingIntegration(),
          Sentry.replayIntegration({
            maskAllText: false,
            blockAllMedia: false,
          }),
        ],
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0.05,
        replaysOnErrorSampleRate: 1.0,
      });
      isSentryInitialized = true;
      console.log('[Telemetry] Sentry initialized successfully.');
    } catch (err) {
      console.error('[Telemetry] Failed to initialize Sentry:', err);
    }
  } else {
    console.warn('[Telemetry] VITE_SENTRY_DSN not configured. Local diagnostic mode active.');
  }
};

/**
 * Capture and log an exception with context tags/metadata.
 */
export const logError = (error, context = {}) => {
  console.error('[Telemetry Error]', error, '\nContext:', context);
  if (isSentryInitialized) {
    try {
      Sentry.withScope((scope) => {
        if (context.tags) {
          Object.entries(context.tags).forEach(([key, val]) => scope.setTag(key, val));
        }
        if (context.extra) {
          Object.entries(context.extra).forEach(([key, val]) => scope.setExtra(key, val));
        }
        scope.setLevel('error');
        Sentry.captureException(error);
      });
    } catch (err) {
      console.error('[Telemetry] Error calling Sentry.captureException:', err);
    }
  }
};

/**
 * Capture and log a warning message.
 */
export const logWarning = (message, context = {}) => {
  console.warn('[Telemetry Warning]', message, '\nContext:', context);
  if (isSentryInitialized) {
    try {
      Sentry.withScope((scope) => {
        if (context.tags) {
          Object.entries(context.tags).forEach(([key, val]) => scope.setTag(key, val));
        }
        if (context.extra) {
          Object.entries(context.extra).forEach(([key, val]) => scope.setExtra(key, val));
        }
        scope.setLevel('warning');
        Sentry.captureMessage(message);
      });
    } catch (err) {
      console.error('[Telemetry] Error calling Sentry.captureMessage (warning):', err);
    }
  }
};

/**
 * Capture and log an info message.
 */
export const logInfo = (message, context = {}) => {
  console.info('[Telemetry Info]', message, '\nContext:', context);
  if (isSentryInitialized) {
    try {
      Sentry.withScope((scope) => {
        if (context.tags) {
          Object.entries(context.tags).forEach(([key, val]) => scope.setTag(key, val));
        }
        if (context.extra) {
          Object.entries(context.extra).forEach(([key, val]) => scope.setExtra(key, val));
        }
        scope.setLevel('info');
        Sentry.captureMessage(message);
      });
    } catch (err) {
      console.error('[Telemetry] Error calling Sentry.captureMessage (info):', err);
    }
  }
};

/**
 * Capture and log chunk loading errors with full browser, route, and deployment details.
 */
export const logChunkError = (error, context = {}) => {
  let runningVersion = 'development';
  try {
    runningVersion = __APP_VERSION__;
  } catch (e) {
    // Fallback if __APP_VERSION__ is not defined
  }

  logError(error, {
    tags: {
      type: 'chunk_load_failure',
      buildVersion: runningVersion,
      route: window.location.pathname,
      ...context.tags
    },
    extra: {
      message: error?.message || error,
      userAgent: navigator.userAgent,
      url: window.location.href,
      referrer: document.referrer,
      ...context.extra
    }
  });
};

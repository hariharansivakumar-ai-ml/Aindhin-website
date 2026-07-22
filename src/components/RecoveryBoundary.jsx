import React from 'react';
import { logError, logWarning } from '../utils/logger';
import { RefreshCw, AlertTriangle, Home, Loader2 } from 'lucide-react';
import {
  checkVersionAndRecover,
  isChunkError,
  isReloadCoolingDown,
  markReloadAttempt,
} from '../utils/versionCheck';

/**
 * RecoveryBoundary — Production-grade React Error Boundary.
 *
 * Key fixes vs. the previous version:
 *
 * 1. ASYNC componentDidCatch FIX:
 *    `componentDidCatch` cannot be async (React ignores the returned promise).
 *    The old code called `checkVersionAndRecover()` without `.then()`, meaning
 *    the async work ran fire-and-forget and the reload never triggered reliably.
 *    Fixed by calling `.then()` explicitly and managing state transitions.
 *
 * 2. RECOVERY SPINNER:
 *    While `checkVersionAndRecover` is awaiting the server version.json,
 *    we show a "Checking for updates…" UI instead of the error card.
 *    This prevents a jarring flash of the error screen on every new deployment.
 *
 * 3. COUNTDOWN TIMER:
 *    After detecting a chunk error, we wait up to AUTO_RECOVER_MS before
 *    showing the error fallback. If checkVersionAndRecover fires a reload
 *    within that window, the user never sees the error screen at all.
 *
 * 4. COOLDOWN-AWARE HARD RESET:
 *    The manual "Reload Live Content" button always fires regardless of cooldown,
 *    using markReloadAttempt() to prevent the subsequent load from looping.
 */

const AUTO_RECOVER_MS = 8_000; // Max ms to show spinner before surfacing error UI

class RecoveryBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError:    false,
      error:       null,
      errorInfo:   null,
      isRecovering: false, // True while checkVersionAndRecover is running
      isRetrying:  false,  // True after user clicks "Reload Live Content"
    };
    this._recoveryTimer = null;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    logError(error, {
      tags:  { type: 'react_render_error' },
      extra: { componentStack: errorInfo?.componentStack },
    });

    if (isChunkError(error)) {
      console.warn('[RecoveryBoundary] Chunk loading failure caught. Initiating recovery check…');

      // Show the recovery spinner immediately
      this.setState({ isRecovering: true });

      // Set a safety timer — if checkVersionAndRecover hasn't reloaded the page
      // within AUTO_RECOVER_MS, we surface the error fallback UI
      this._recoveryTimer = setTimeout(() => {
        this.setState({ isRecovering: false });
        logWarning('[RecoveryBoundary] Recovery timer expired — showing fallback error UI.');
      }, AUTO_RECOVER_MS);

      // FIX: Use .then() instead of await — componentDidCatch must be synchronous
      checkVersionAndRecover(() => {
        // onNoMismatch: no new deployment found — stop spinner, show error UI
        clearTimeout(this._recoveryTimer);
        this.setState({ isRecovering: false });
        logWarning('[RecoveryBoundary] checkVersionAndRecover: no version mismatch found. Showing error UI.', {
          extra: { error: error.message || String(error) },
        });
      });
      // If checkVersionAndRecover detects a mismatch, it calls window.location.replace()
      // and this component will unmount before the timer fires — no leak.
    }
  }

  componentWillUnmount() {
    clearTimeout(this._recoveryTimer);
  }

  handleHardReset = () => {
    this.setState({ isRetrying: true });
    markReloadAttempt(); // Record the attempt to prevent the next load from looping
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('t', Date.now().toString());
      window.location.replace(url.toString());
    } catch {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  // ─── Recovery spinner UI ────────────────────────────────────────────────────
  renderRecovering() {
    return (
      <div
        className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50/10 to-slate-50"
        style={{ fontFamily: 'var(--font-inter, system-ui, -apple-system, sans-serif)' }}
      >
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mb-8 border border-blue-100/50">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">
            Checking for Updates…
          </h1>
          <p className="text-slate-500 leading-relaxed text-sm">
            A new version of Aindhin may have been deployed. We're verifying
            the latest assets and will refresh automatically if needed.
          </p>
        </div>
      </div>
    );
  }

  // ─── Error fallback UI ──────────────────────────────────────────────────────
  renderError() {
    const { error, errorInfo, isRetrying } = this.state;
    const isChunkLoadError = isChunkError(error);

    return (
      <div
        className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50/10 to-slate-50"
        style={{ fontFamily: 'var(--font-inter, system-ui, -apple-system, sans-serif)' }}
      >
        <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-8 md:p-10 flex flex-col items-center text-center transition-all duration-300">

          {/* Icon */}
          <div className="relative w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mb-8 border border-amber-100/50">
            <AlertTriangle className="w-10 h-10" />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            {isChunkLoadError ? 'Application Update Available' : 'Something Went Wrong'}
          </h1>

          {/* Description */}
          <p className="text-slate-500 leading-relaxed mb-8 max-w-md text-sm md:text-base">
            {isChunkLoadError
              ? 'We launched a new version of Aindhin. Click below to load the latest content — your session will be preserved.'
              : 'A rendering failure occurred in this section. Our team has been notified. You can try reloading or return to the home page.'
            }
          </p>

          {/* Diagnostics — collapsed by default */}
          <details className="w-full text-left bg-slate-50 rounded-2xl border border-slate-100 mb-8 overflow-hidden group">
            <summary className="px-5 py-4 text-xs font-bold text-slate-500 cursor-pointer select-none hover:bg-slate-100/50 transition-colors flex justify-between items-center">
              <span>Technical Diagnostics</span>
              <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200">▼</span>
            </summary>
            <div className="p-5 border-t border-slate-100 font-mono text-[11px] text-slate-600 bg-slate-50 max-h-[180px] overflow-y-auto">
              <p className="font-bold text-red-500 mb-1">
                {error?.name || 'Error'}: {error?.message || 'Unknown reason'}
              </p>
              {errorInfo?.componentStack && (
                <pre className="whitespace-pre-wrap leading-relaxed border-t border-slate-200/60 pt-2 mt-2 text-slate-500">
                  {errorInfo.componentStack}
                </pre>
              )}
            </div>
          </details>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={this.handleHardReset}
              disabled={isRetrying}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(21,91,172,0.25)] hover:bg-blue-700 hover:shadow-[0_15px_30px_rgba(21,91,172,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm border-none cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
            >
              <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Loading New Content…' : 'Reload Live Content'}
            </button>
            <button
              onClick={this.handleGoHome}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-200 hover:text-slate-900 transition-all duration-200 text-sm cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </button>
          </div>

        </div>
      </div>
    );
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }
    // Show spinner while recovery is in progress, error UI after timer expires
    return this.state.isRecovering ? this.renderRecovering() : this.renderError();
  }
}

export default RecoveryBoundary;

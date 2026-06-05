import React from 'react';
import { logError, logWarning } from '../utils/logger';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';
import { checkVersionAndRecover } from '../utils/versionCheck';

/**
 * RecoveryBoundary is a high-fidelity Error Boundary component that intercepts
 * rendering crashes, automatically triggers cache-busted reloads for chunk loading failures,
 * logs diagnostics, and provides a polished fallback UI to avoid white screen crashes.
 */
class RecoveryBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    logError(error, {
      tags: { type: 'react_render_error' },
      extra: { componentStack: errorInfo?.componentStack }
    });

    // Check if the error is a chunk / asset loading failure
    const errorMessage = error?.message || '';
    const isChunkLoadError =
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('Loading chunk') ||
      errorMessage.includes('imported module') ||
      errorMessage.includes('default') ||
      errorMessage.includes('loading dynamically') ||
      error.name === 'ChunkLoadError';

    if (isChunkLoadError) {
      console.warn('[Recovery] Chunk loading failure caught by RecoveryBoundary. Checking for build version updates...');
      checkVersionAndRecover(() => {
        logWarning('Persistent chunk load failure caught, but no version mismatch found. Displaying fallback UI.', {
          extra: { error: error.message || error }
        });
      });
    }
  }

  handleHardReset = () => {
    try {
      const now = Date.now();
      localStorage.setItem('aindhin_chunk_reload', now.toString());
      const url = new URL(window.location.href);
      url.searchParams.set('t', now.toString());
      window.location.replace(url.toString());
    } catch (e) {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const isChunkError = this.state.error?.message?.includes('Failed to fetch') ||
        this.state.error?.message?.includes('Loading chunk') ||
        this.state.error?.message?.includes('imported module') ||
        this.state.error?.message?.includes('default');

      return (
        <div className="min-h-[80vh] w-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <div className="max-w-xl w-full bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.06)] p-8 md:p-10 flex flex-col items-center text-center">
            
            {/* Alert Icon */}
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mb-8 border border-amber-100/50">
              <AlertTriangle className="w-10 h-10" />
            </div>

            {/* Error Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              {isChunkError ? 'New Update Available!' : 'Something Went Wrong'}
            </h1>

            {/* Error Description */}
            <p className="text-slate-500 leading-relaxed mb-8 max-w-md text-sm md:text-base">
              {isChunkError 
                ? 'We launched a new version of the platform! To load the latest content and active campaign features, please refresh the page.'
                : 'A rendering or state failure occurred while loading this section. Our team has been notified, and we can attempt to restore your session.'
              }
            </p>

            {/* Diagnostics Report */}
            <details className="w-full text-left bg-slate-50 rounded-2xl border border-slate-100 mb-8 overflow-hidden group">
              <summary className="px-5 py-4 text-xs font-bold text-slate-500 cursor-pointer select-none hover:bg-slate-100/50 transition-colors flex justify-between items-center">
                <span>View Diagnostic Report</span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-5 border-t border-slate-100 text-left font-mono text-[11px] text-slate-600 bg-slate-50 max-h-[160px] overflow-y-auto">
                <p className="font-bold text-red-500 mb-1">Error: {this.state.error?.name || 'Error'}</p>
                <p className="mb-2 leading-relaxed">{this.state.error?.message || 'Unknown reason'}</p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="whitespace-pre-wrap leading-relaxed border-t border-slate-200/60 pt-2 mt-2 font-mono">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            </details>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={this.handleHardReset}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-[0_10px_25px_rgba(37,99,235,0.25)] hover:bg-blue-600 hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm border-none cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Live Content
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

    return this.props.children;
  }
}

export default RecoveryBoundary;

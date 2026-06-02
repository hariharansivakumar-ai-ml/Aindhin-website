import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Check if the error is related to module loading / chunk preloading failures
    const errorMessage = error?.message || '';
    const isChunkLoadError = 
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('Loading chunk') ||
      errorMessage.includes('imported module') ||
      errorMessage.includes('default') ||
      errorMessage.includes('loading dynamically');

    if (isChunkLoadError) {
      try {
        const now = Date.now();
        const lastReload = localStorage.getItem('aindhin_chunk_reload');
        
        // Limit automatic page refreshes to at most once per 15 seconds to avoid loops
        if (!lastReload || (now - parseInt(lastReload, 10) > 15000)) {
          localStorage.setItem('aindhin_chunk_reload', now.toString());
          console.warn('ErrorBoundary triggering cache-busted page reload...');
          const url = new URL(window.location.href);
          url.searchParams.set('t', now.toString());
          window.location.replace(url.toString());
          return;
        } else {
          console.error('Page was already reloaded within 15s. Showing premium fallback UI to prevent loop.');
        }
      } catch (e) {
        window.location.reload();
        return;
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-12" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-[0_12px_44px_rgba(0,0,0,0.06)] max-w-lg w-full">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Unable to Load Page Section</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We encountered a connection issue while fetching the latest page content. This usually happens during an app update.
            </p>
            <button 
              onClick={() => {
                const now = Date.now();
                const url = new URL(window.location.href);
                url.searchParams.set('t', now.toString());
                window.location.replace(url.toString());
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              Reload Live Content
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

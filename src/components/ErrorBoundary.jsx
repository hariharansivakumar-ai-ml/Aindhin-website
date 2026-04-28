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
    console.error('ErrorBoundary caught an error', error, errorInfo);
    // If the error is related to failing to fetch dynamically imported module
    if (error.message && error.message.includes('Failed to fetch dynamically imported module')) {
      // Force reload the page once if chunk load fails
      const reloaded = sessionStorage.getItem('chunk_reloaded');
      if (!reloaded) {
        sessionStorage.setItem('chunk_reloaded', 'true');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Oops! Something went wrong.</h2>
          <p className="text-slate-600 mb-6">We're having trouble loading this section. This is usually due to a recent update.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

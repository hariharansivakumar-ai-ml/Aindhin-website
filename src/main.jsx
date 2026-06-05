import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { initLogger, logError, logWarning } from './utils/logger'

// Initialize the unified telemetry logging system (with Sentry support)
initLogger();

// Gracefully handle chunk loading & dynamic import errors (e.g., from fresh production deployments)
(function() {
    const handleChunkLoadError = (details, rawError) => {
        logWarning('Global error handler caught chunk/module load failure', {
            tags: { type: 'chunk_failure_interception' },
            extra: { details, rawError: rawError?.message || rawError }
        });
        
        try {
            const now = Date.now();
            const lastReload = localStorage.getItem('aindhin_chunk_reload');
            
            // Limit automatic page refreshes to at most once per 15 seconds to avoid reload loops
            if (!lastReload || (now - parseInt(lastReload, 10) > 15000)) {
                localStorage.setItem('aindhin_chunk_reload', now.toString());
                logWarning('Intercepted chunk error. Refreshing asset cache via page reload...', {
                    extra: { targetUrl: window.location.href }
                });
                const url = new URL(window.location.href);
                url.searchParams.set('t', now.toString());
                window.location.replace(url.toString());
            } else {
                logError(new Error('Preload/chunk failure occurred again within 15s. Automatic reload aborted.'), {
                    tags: { type: 'chunk_reload_loop_prevented' }
                });
            }
        } catch (e) {
            logError(e, { extra: { msg: 'Global interceptor reload failure' } });
        }
    };

    // 1. Intercept Vite preload errors
    window.addEventListener('vite:preloadError', (event) => {
        event.preventDefault(); // Stop default browser console error
        handleChunkLoadError('vite:preloadError', event);
    });

    // 2. Intercept unhandled promise rejections (thrown when a dynamic import promise rejects)
    window.addEventListener('unhandledrejection', (event) => {
        const error = event.reason || {};
        const message = error.message || '';
        if (
            message.includes('Failed to fetch dynamically imported module') ||
            message.includes('error loading dynamically imported module') ||
            message.includes('Loading chunk') ||
            message.includes('default')
        ) {
            event.preventDefault();
            handleChunkLoadError({ type: 'unhandledrejection', message }, error);
        }
    });

    // 3. Intercept general script/style asset loading errors
    window.addEventListener('error', (event) => {
        const target = event.target || {};
        if (target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
            const url = target.src || target.href || '';
            if (url.includes('/assets/')) {
                event.preventDefault();
                handleChunkLoadError({ type: 'resourceLoadError', url }, event.error || new Error(`Resource load failed: ${url}`));
            }
        }
    }, true); // Use capture phase to catch resource load events
})();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)

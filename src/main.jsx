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
                return true;
            } else {
                logError(new Error('Preload/chunk failure occurred again within 15s. Automatic reload aborted.'), {
                    tags: { type: 'chunk_reload_loop_prevented' }
                });
                return false;
            }
        } catch (e) {
            logError(e, { extra: { msg: 'Global interceptor reload failure' } });
            return false;
        }
    };

    // 1. Intercept Vite preload errors
    window.addEventListener('vite:preloadError', (event) => {
        const reloaded = handleChunkLoadError('vite:preloadError', event);
        if (reloaded) {
            event.preventDefault(); // Stop default browser console error only if we actually reload the page
        }
    });

    // 2. Intercept unhandled promise rejections (thrown when a dynamic import promise rejects)
    window.addEventListener('unhandledrejection', (event) => {
        const error = event.reason || {};
        const message = error.message || '';
        if (
            message.includes('Failed to fetch dynamically imported module') ||
            message.includes('error loading dynamically imported module') ||
            message.includes('Loading chunk')
        ) {
            const reloaded = handleChunkLoadError({ type: 'unhandledrejection', message }, error);
            if (reloaded) {
                event.preventDefault();
            }
        }
    });

    // 3. Intercept general script/style asset loading errors
    window.addEventListener('error', (event) => {
        const target = event.target || {};
        if (target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
            const url = target.src || target.href || '';
            if (url.includes('/assets/')) {
                const reloaded = handleChunkLoadError({ type: 'resourceLoadError', url }, event.error || new Error(`Resource load failed: ${url}`));
                if (reloaded) {
                    event.preventDefault();
                }
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Gracefully handle chunk loading & dynamic import errors (e.g., from fresh production deployments)
(function() {
    const handleChunkLoadError = (details) => {
        console.warn('Global error handler caught chunk/module load failure:', details);
        try {
            const now = Date.now();
            const lastReload = localStorage.getItem('aindhin_chunk_reload');
            
            // Limit automatic page refreshes to at most once per 15 seconds to avoid reload loops
            if (!lastReload || (now - parseInt(lastReload, 10) > 15000)) {
                localStorage.setItem('aindhin_chunk_reload', now.toString());
                const url = new URL(window.location.href);
                url.searchParams.set('t', now.toString());
                window.location.replace(url.toString());
            } else {
                console.error('Preload/chunk failure occurred again within 15s. Stopping auto-reload to prevent loop.');
            }
        } catch (e) {
            console.error('Failed to execute automatic reload:', e);
        }
    };

    // 1. Intercept Vite preload errors
    window.addEventListener('vite:preloadError', (event) => {
        event.preventDefault(); // Stop default browser console error
        handleChunkLoadError('vite:preloadError');
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
            event.preventDefault();
            handleChunkLoadError({ type: 'unhandledrejection', message });
        }
    });

    // 3. Intercept general script/style asset loading errors
    window.addEventListener('error', (event) => {
        const target = event.target || {};
        if (target.tagName === 'SCRIPT' || target.tagName === 'LINK') {
            const url = target.src || target.href || '';
            if (url.includes('/assets/')) {
                handleChunkLoadError({ type: 'resourceLoadError', url });
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

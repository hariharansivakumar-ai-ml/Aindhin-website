import { lazy as reactLazy } from 'react';
import { logWarning, logChunkError } from './logger';
import { checkVersionAndRecover, isChunkError } from './versionCheck';

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 500; // ms

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Extracts the asset URL/path from a dynamic import function's string representation.
 */
const extractUrl = (fn) => {
  try {
    const str = fn.toString();
    // Look for path strings in import("path") or import('path') or __vitePreload calls
    const match = str.match(/["']([^"']+\.js)["']/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (e) {
    // Graceful fallback if function serialization is not supported
  }
  return null;
};

/**
 * Checks if a URL points to a valid JS asset (and not an SPA 404 HTML fallback).
 */
const checkAndFetchAsset = async (url) => {
  const response = await fetch(url, { method: 'GET', cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Asset fetch failed: ${response.status}`);
  }
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error('Asset returned HTML instead of JavaScript (404 SPA fallback)');
  }
  return true;
};

/**
 * Executes a function returning a dynamic import promise, retrying it with backoff and cache busting if it fails.
 */
const retryImport = async (importFn, attemptsLeft = RETRY_ATTEMPTS, delay = RETRY_DELAY_BASE) => {
  try {
    const module = await importFn();
    return module;
  } catch (error) {
    if (attemptsLeft <= 1) {
      throw error;
    }

    logWarning(`Dynamic import failed. Attempting recovery and cache-busted retry... (${attemptsLeft - 1} attempts left)`, {
      extra: { error: error.message || error, delay }
    });

    try {
      const url = extractUrl(importFn);
      if (url) {
        // Resolve absolute/relative URLs relative to the application's base origin
        const resolvedUrl = new URL(url, window.location.origin).href;
        const cacheBustedUrl = `${resolvedUrl}${resolvedUrl.includes('?') ? '&' : '?'}retry_t=${Date.now()}`;
        
        // Check if file is physically present and is not HTML
        await checkAndFetchAsset(cacheBustedUrl);
        
        // Perform cache-busted dynamic import (Vite ignores via @vite-ignore)
        return await import(/* @vite-ignore */ cacheBustedUrl);
      }
    } catch (retryErr) {
      logWarning(`Cache-busted dynamic import retry failed, falling back to standard delay retry.`, {
        extra: { error: retryErr.message }
      });
    }

    await sleep(delay);
    return retryImport(importFn, attemptsLeft - 1, delay * 2);
  }
};

/**
 * A safe wrapper around React's lazy() that detects and handles chunk loading errors,
 * deployment mismatch/cache issues, and recovers gracefully.
 */
export const safeLazy = (importFn) => {
  return reactLazy(async () => {
    try {
      const module = await retryImport(importFn);
      
      // Ensure the default export exists in the loaded module.
      // If it doesn't, it could be a corrupted chunk or an index.html returned as JS.
      if (!module || !('default' in module)) {
        throw new TypeError("Module loaded successfully but is missing the 'default' export.");
      }
      
      return module;
    } catch (error) {
      // Log structured chunk load error
      logChunkError(error, {
        tags: { context: 'safeLazy_import' }
      });

      if (isChunkError(error)) {
        // Return a pending promise that only rejects if no version mismatch is found.
        // If there's a mismatch, checkVersionAndRecover will reload the browser.
        return new Promise((resolve, reject) => {
          checkVersionAndRecover(() => {
            reject(error);
          });
        });
      }

      // Propagate the rejection for non-chunk errors
      throw error;
    }
  });
};

export default safeLazy;

import { lazy as reactLazy } from 'react';
import { logWarning, logChunkError } from './logger';
import { checkVersionAndRecover } from './versionCheck';

const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_BASE = 500; // ms

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes a function returning a dynamic import promise, retrying it with backoff if it fails.
 */
const retryImport = async (importFn, attemptsLeft = RETRY_ATTEMPTS, delay = RETRY_DELAY_BASE) => {
  try {
    return await importFn();
  } catch (error) {
    if (attemptsLeft <= 1) {
      throw error;
    }
    logWarning(`Dynamic import failed. Retrying... (${attemptsLeft - 1} attempts left)`, {
      extra: { error: error.message || error, delay }
    });
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
      return await retryImport(importFn);
    } catch (error) {
      // Log structured chunk load error
      logChunkError(error, {
        tags: { context: 'safeLazy_import' }
      });

      // Check if the error is a chunk / asset loading failure
      const errorMessage = error?.message || '';
      const isChunkLoadError =
        errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('Loading chunk') ||
        errorMessage.includes('imported module') ||
        errorMessage.includes('loading dynamically') ||
        error.name === 'ChunkLoadError';

      if (isChunkLoadError) {
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

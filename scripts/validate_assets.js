import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');

// Manifest path can be .vite/manifest.json (Vite 5+) or manifest.json (Vite 4)
const manifestPaths = [
  path.join(DIST_DIR, '.vite/manifest.json'),
  path.join(DIST_DIR, 'manifest.json')
];

function validate() {
  console.log('[Asset Validator] Starting build-time asset verification...');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`[Asset Validator] Error: dist directory does not exist at ${DIST_DIR}`);
    process.exit(1);
  }

  let manifestPath = null;
  for (const p of manifestPaths) {
    if (fs.existsSync(p)) {
      manifestPath = p;
      break;
    }
  }

  if (!manifestPath) {
    console.error('[Asset Validator] Error: manifest.json not found. Make sure build.manifest is enabled in vite.config.js.');
    process.exit(1);
  }

  console.log(`[Asset Validator] Found manifest at: ${manifestPath}`);
  
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch (err) {
    console.error(`[Asset Validator] Error: Failed to parse manifest.json: ${err.message}`);
    process.exit(1);
  }

  let missingCount = 0;
  const checkedFiles = new Set();

  function checkFileExists(relPath) {
    // Resolve relative path to absolute path
    const absPath = path.resolve(DIST_DIR, relPath);
    if (checkedFiles.has(absPath)) return true;

    if (!fs.existsSync(absPath)) {
      console.error(`[Asset Validator] Missing Asset: "${relPath}" (referenced in build output)`);
      missingCount++;
      return false;
    }
    checkedFiles.add(absPath);
    return true;
  }

  // Iterate over all entries in the manifest
  for (const [key, chunk] of Object.entries(manifest)) {
    // 1. Check the main built chunk file
    if (chunk.file) {
      checkFileExists(chunk.file);
    }

    // 2. Check CSS files associated with this chunk
    if (chunk.css) {
      for (const cssFile of chunk.css) {
        checkFileExists(cssFile);
      }
    }

    // 3. Check assets referenced by this chunk
    if (chunk.assets) {
      for (const assetFile of chunk.assets) {
        checkFileExists(assetFile);
      }
    }
    
    // 4. Check imported chunks
    if (chunk.imports) {
      for (const importKey of chunk.imports) {
        const importChunk = manifest[importKey];
        if (importChunk && importChunk.file) {
          checkFileExists(importChunk.file);
        } else {
          console.error(`[Asset Validator] Invalid import key "${importKey}" in chunk "${key}"`);
          missingCount++;
        }
      }
    }
  }

  // 5. Validate index.html assets
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
    
    // Extract assets referenced in index.html (href="..." or src="..." or content="...")
    const assetRegex = /(src|href|content)=["']\/([^"']+)["']/g;
    let match;
    while ((match = assetRegex.exec(indexHtml)) !== null) {
      const relPath = match[2];
      
      // Skip external links, dynamic search params, or root index, or config files
      if (
        relPath.startsWith('http') ||
        relPath.includes('?') ||
        relPath === '' ||
        relPath.endsWith('.xml') ||
        relPath.endsWith('.txt') ||
        relPath.startsWith('assets/manifest')
      ) {
        continue;
      }
      
      // Only validate actual assets with standard file extensions (skip client-side routing URLs)
      const hasAssetExtension = /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|json|webp)$/i.test(relPath);
      if (hasAssetExtension) {
        checkFileExists(relPath);
      }
    }
  } else {
    console.error(`[Asset Validator] Error: index.html not found in dist folder!`);
    missingCount++;
  }

  if (missingCount > 0) {
    console.error(`[Asset Validator] Validation FAILED! ${missingCount} missing asset(s) detected. Failing the build.`);
    process.exit(1);
  } else {
    console.log(`[Asset Validator] Validation PASSED! Verified ${checkedFiles.size} generated files successfully.`);
  }
}

validate();

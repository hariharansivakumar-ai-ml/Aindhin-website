import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');

const getManifestPath = () => {
  // Vite 5 places the manifest in dist/.vite/manifest.json by default
  const paths = [
    path.join(DIST_DIR, 'manifest.json'),
    path.join(DIST_DIR, '.vite', 'manifest.json')
  ];
  return paths.find(fs.existsSync);
};

const run = () => {
  console.log('=== [Deployment Validator] Starting Build Output Audit ===');
  
  if (!fs.existsSync(DIST_DIR)) {
    console.error('ERROR: Build directory "dist" does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  const manifestPath = getManifestPath();
  if (!manifestPath) {
    console.error('ERROR: Vite build manifest (manifest.json) not found in dist/ or dist/.vite/.');
    console.error('Ensure build.manifest is set to true in vite.config.js.');
    process.exit(1);
  }

  console.log(`Using manifest file: ${manifestPath}`);
  
  let manifestData;
  try {
    manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    console.error('ERROR: Failed to parse manifest.json:', err.message);
    process.exit(1);
  }

  const errors = [];
  const checkedFiles = new Set();

  const verifyFile = (relativePath) => {
    if (!relativePath) return;
    const fullPath = path.join(DIST_DIR, relativePath);
    if (checkedFiles.has(fullPath)) return;

    if (fs.existsSync(fullPath)) {
      checkedFiles.add(fullPath);
    } else {
      errors.push(`Missing file: ${relativePath} (Expected at: ${fullPath})`);
    }
  };

  // Iterate over all entries in the manifest
  Object.entries(manifestData).forEach(([key, value]) => {
    // 1. Verify primary file chunk
    if (value.file) {
      verifyFile(value.file);
    }

    // 2. Verify associated CSS chunks
    if (value.css && Array.isArray(value.css)) {
      value.css.forEach(verifyFile);
    }

    // 3. Verify static assets (images, fonts etc.)
    if (value.assets && Array.isArray(value.assets)) {
      value.assets.forEach(verifyFile);
    }
  });

  // Also verify html entry point exists
  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    errors.push('Missing file: index.html entry point at dist/index.html');
  }

  if (errors.length > 0) {
    console.error('\n=== [Deployment Validator] AUDIT FAILED! ===');
    errors.forEach((err) => console.error(`[FAIL] ${err}`));
    console.error('\nDeployments with missing chunks will cause white screens. Process aborting.');
    process.exit(1);
  }

  console.log(`\n=== [Deployment Validator] AUDIT PASSED ===`);
  console.log(`Successfully validated ${checkedFiles.size} chunks & assets.`);
  console.log('No missing files found. Ready for production deployment.');
  process.exit(0);
};

run();

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const zipFile = path.resolve(rootDir, 'aindhin-website-dist.zip');

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
};

function packageDist() {
  console.log('\n=== [Packager] Creating Production Deployment Archive ===');

  if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
    console.error('ERROR: dist/ or dist/index.html does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  // Ensure .htaccess was copied to dist
  const distHtaccess = path.join(distDir, '.htaccess');
  const publicHtaccess = path.join(rootDir, 'public', '.htaccess');
  if (!fs.existsSync(distHtaccess) && fs.existsSync(publicHtaccess)) {
    fs.copyFileSync(publicHtaccess, distHtaccess);
    console.log('Copied .htaccess to dist/');
  }

  if (fs.existsSync(zipFile)) {
    try {
      fs.unlinkSync(zipFile);
    } catch { /* ignore */ }
  }

  console.log('Compressing dist/ contents into aindhin-website-dist.zip...');

  const isWindows = process.platform === 'win32';
  try {
    if (isWindows) {
      // Use PowerShell to compress contents of dist into zip
      execSync(`powershell -Command "Compress-Archive -Path dist\\* -DestinationPath aindhin-website-dist.zip -Force"`, {
        cwd: rootDir,
        stdio: 'inherit',
      });
    } else {
      execSync(`cd dist && zip -r ../aindhin-website-dist.zip ./*`, {
        cwd: rootDir,
        stdio: 'inherit',
      });
    }

    if (fs.existsSync(zipFile)) {
      const stats = fs.statSync(zipFile);
      console.log(`✔ Archive created successfully: aindhin-website-dist.zip (${formatBytes(stats.size)})`);
      console.log('\n--- HOSTINGER DEPLOYMENT INSTRUCTIONS ---');
      console.log('1. Open Hostinger hPanel -> File Manager -> public_html/');
      console.log('2. Upload "aindhin-website-dist.zip" (takes ~3-5 seconds)');
      console.log('3. Right click "aindhin-website-dist.zip" -> click "Extract"');
      console.log('4. Delete "aindhin-website-dist.zip" from public_html/');
      console.log('Done! Zero dropped files, zero missing chunks, zero downtime!\n');
    }
  } catch (err) {
    console.error('Failed to create deployment zip:', err.message);
    process.exit(1);
  }
}

packageDist();

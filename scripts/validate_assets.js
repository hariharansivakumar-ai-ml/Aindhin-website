/**
 * validate_assets.js — Post-build chunk verification script.
 *
 * Run automatically as the final step of `npm run build`:
 *   node scripts/generate_sitemap.js && vite build && node scripts/validate_assets.js
 *
 * What it does:
 *   1. Reads dist/.vite/manifest.json (or dist/manifest.json).
 *   2. Collects every .js and .css file referenced in the manifest.
 *   3. Verifies each file physically exists in dist/.
 *   4. Reports total chunks, total size, and the largest chunks.
 *   5. Exits with code 1 if ANY referenced chunk is missing —
 *      this blocks the FTP upload script from deploying a broken build.
 *
 * FTP safety:
 *   A partial or interrupted build can produce a manifest that references
 *   chunk files which were never written to disk. Uploading such a build
 *   causes ChunkLoadErrors for all users. This script catches that at
 *   build time before the files ever reach the server.
 */

import fs   from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const distDir    = path.resolve(__dirname, '..', 'dist')

// ANSI colour helpers
const GREEN  = (s) => `\x1b[32m${s}\x1b[0m`
const RED    = (s) => `\x1b[31m${s}\x1b[0m`
const YELLOW = (s) => `\x1b[33m${s}\x1b[0m`
const BOLD   = (s) => `\x1b[1m${s}\x1b[0m`
const DIM    = (s) => `\x1b[2m${s}\x1b[0m`

const formatBytes = (bytes) => {
  if (bytes < 1024)       return `${bytes} B`
  if (bytes < 1024 ** 2)  return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(2)} MB`
}

// ── 1. Locate manifest.json ────────────────────────────────────────────────────
const manifestPaths = [
  path.join(distDir, '.vite', 'manifest.json'),
  path.join(distDir, 'manifest.json'),
]
const manifestPath = manifestPaths.find((p) => fs.existsSync(p))

if (!manifestPath) {
  console.error(RED('\n✖ VALIDATION FAILED: manifest.json not found in dist/'))
  console.error(DIM('  Make sure vite build completed successfully and manifest: true is set in vite.config.js\n'))
  process.exit(1)
}

// ── 2. Parse manifest ─────────────────────────────────────────────────────────
let manifest
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
} catch (e) {
  console.error(RED(`\n✖ VALIDATION FAILED: Could not parse manifest.json — ${e.message}\n`))
  process.exit(1)
}

// ── 3. Collect all referenced chunk files ─────────────────────────────────────
const referenced = new Set()

for (const entry of Object.values(manifest)) {
  if (entry.file) {
    referenced.add(entry.file)
  }
  // CSS files injected by chunks
  if (Array.isArray(entry.css)) {
    entry.css.forEach((f) => referenced.add(f))
  }
  // Imported chunk files (dynamic imports listed in the manifest)
  if (Array.isArray(entry.imports)) {
    // imports are manifest keys, not file paths — resolved in the main loop above
  }
}

// ── 4. Verify each file exists on disk ────────────────────────────────────────
const missing  = []
const existing = []

for (const relPath of referenced) {
  const absPath = path.join(distDir, relPath)
  if (fs.existsSync(absPath)) {
    const { size } = fs.statSync(absPath)
    existing.push({ relPath, size })
  } else {
    missing.push(relPath)
  }
}

// ── 5. Print summary ──────────────────────────────────────────────────────────
const totalSize = existing.reduce((acc, f) => acc + f.size, 0)
const sorted    = [...existing].sort((a, b) => b.size - a.size)

console.log('\n' + BOLD('━━━ Build Asset Validation ━━━'))
console.log(`  Manifest:   ${DIM(manifestPath.replace(distDir, 'dist'))}`)
console.log(`  Chunks:     ${BOLD(existing.length)} files`)
console.log(`  Total size: ${BOLD(formatBytes(totalSize))}`)

if (sorted.length > 0) {
  console.log(`\n${BOLD('  Top 5 largest chunks:')}`)
  sorted.slice(0, 5).forEach(({ relPath, size }, i) => {
    const sizeStr = formatBytes(size)
    const bar     = size > 500 * 1024 ? RED(sizeStr) : size > 200 * 1024 ? YELLOW(sizeStr) : GREEN(sizeStr)
    console.log(`    ${i + 1}. ${DIM(relPath.padEnd(55))} ${bar}`)
  })
}

// ── 6. Report missing files ───────────────────────────────────────────────────
if (missing.length > 0) {
  console.error('\n' + RED(BOLD(`✖ VALIDATION FAILED — ${missing.length} chunk(s) referenced in manifest but missing from dist/:`)))
  missing.forEach((f) => console.error(RED(`    ✖ ${f}`)))
  console.error(
    '\n' + YELLOW(
      '  ⚠ Do NOT upload this build to FTP.\n' +
      '  ⚠ The server would return 404 for these files, causing ChunkLoadErrors for all users.\n' +
      '  ⚠ Run `npm run build` again to generate a complete build.\n'
    )
  )
  process.exit(1)
}

// ── 7. Read version.json for confirmation ─────────────────────────────────────
const versionPath = path.join(distDir, 'version.json')
if (fs.existsSync(versionPath)) {
  try {
    const v = JSON.parse(fs.readFileSync(versionPath, 'utf-8'))
    console.log(`\n  Build version: ${BOLD(v.version)}`)
    console.log(`  Built at:      ${DIM(v.buildTime)}`)
    console.log(`  Entry asset:   ${DIM(v.entry)}`)
  } catch { /* ignore */ }
}

console.log('\n' + GREEN(BOLD(`✔ All ${existing.length} chunks verified. Build is safe to deploy via FTP.\n`)))
process.exit(0)

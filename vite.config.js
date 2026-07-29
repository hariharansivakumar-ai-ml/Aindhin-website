import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

/**
 * buildVersionPlugin
 *
 * Injects __APP_VERSION__ (a Unix timestamp string) at build time,
 * and writes dist/version.json with extended metadata used by versionCheck.js.
 *
 * version.json schema:
 *   { version, entry, buildTime, chunkCount }
 *
 * - version:    Unix timestamp string — unique per build
 * - entry:      Path to the hashed entry JS (used to verify upload completeness)
 * - buildTime:  ISO-8601 timestamp for human-readable deploy auditing
 * - chunkCount: Total number of asset chunks generated (useful for monitoring)
 */
function buildVersionPlugin() {
  const version = Date.now().toString()

  return {
    name: 'build-version-plugin',
    config() {
      return {
        define: {
          __APP_VERSION__: JSON.stringify(version),
        },
      }
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true })
      }

      // ── Locate manifest.json ─────────────────────────────────────────────
      const manifestPaths = [
        path.join(distDir, '.vite', 'manifest.json'),
        path.join(distDir, 'manifest.json'),
      ]
      const manifestPath = manifestPaths.find(fs.existsSync)

      let entryFile   = ''
      let chunkCount  = 0

      if (manifestPath) {
        try {
          const manifest  = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
          const entryKey  = Object.keys(manifest).find((k) => manifest[k].isEntry)
          if (entryKey && manifest[entryKey].file) {
            entryFile = `/${manifest[entryKey].file}`
          }
          chunkCount = Object.values(manifest).filter((v) => v.file?.endsWith('.js')).length
        } catch (e) {
          console.error('[Version Plugin] Failed to parse manifest.json:', e)
        }
      }

      // ── Fallback: scan assets/ directory ──────────────────────────────────
      if (!entryFile) {
        const assetsDir = path.join(distDir, 'assets')
        if (fs.existsSync(assetsDir)) {
          const files = fs.readdirSync(assetsDir)
          chunkCount  = files.filter((f) => f.endsWith('.js')).length
          const indexFile = files.find((f) => f.startsWith('index-') && f.endsWith('.js'))
          if (indexFile) entryFile = `/assets/${indexFile}`
        }
      }

      const payload = {
        version,
        entry:      entryFile,
        buildTime:  new Date().toISOString(),
        chunkCount,
      }

      fs.writeFileSync(
        path.join(distDir, 'version.json'),
        JSON.stringify(payload, null, 2),
        'utf-8'
      )
      console.log(
        `[Version Plugin] version.json → version: ${version}, ` +
        `entry: ${entryFile}, chunks: ${chunkCount}`
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backendUrl = env.VITE_API_URL || 'https://api2.aindhin.com/api'

  let backendOrigin = 'http://localhost:8080'
  if (backendUrl && backendUrl.startsWith('http')) {
    try {
      backendOrigin = new URL(backendUrl).origin
    } catch (e) {
      console.error('[Vite Config] Invalid VITE_API_URL:', backendUrl)
    }
  }

  return {
    plugins: [react(), buildVersionPlugin()],
    base: '/',

    server: {
      proxy: {
        '/api': {
          target: backendOrigin,
          changeOrigin: true,
        },
        '/sitemap.xml': {
          target: `${backendOrigin}/api/sitemap.xml`,
          changeOrigin: true,
          rewrite: () => '',
        },
      },
    },

    build: {
      outDir:            'dist',
      manifest:          true,
      emptyOutDir:       true,
      sourcemap:         false,
      // Keep assets ≥4KB as files — never inline chunks as base64 data URIs
      assetsInlineLimit: 4096,
      // Warn when a single chunk exceeds 1MB (after splitting)
      chunkSizeWarningLimit: 1000,

      rollupOptions: {
        output: {
          // Deterministic, hash-stamped filenames for aggressive long-term caching
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',

          /**
           * manualChunks — Split vendor bundle into logical sub-chunks.
           *
           * WHY THIS MATTERS:
           *   Previously all node_modules landed in a single "vendor" chunk.
           *   Any dependency update (e.g. lucide-react icon addition) regenerated
           *   the entire vendor hash, invalidating the browser cache for ALL users.
           *
           *   Now each vendor group has an independent hash:
           *   - react-vendor:  Only re-hashes when React / ReactDOM / react-router changes
           *   - ui-vendor:     Only re-hashes when Framer Motion / Lucide changes
           *   - sentry-vendor: Only re-hashes when Sentry SDK updates
           *   - query-vendor:  Only re-hashes when TanStack Query updates
           *   - vendor:        Everything else (rarely changes)
           *
           *   Users keep their cached chunks across deploys unless that specific
           *   vendor group actually changed.
           */
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('framer-motion') || id.includes('lucide-react')) {
                return 'ui-vendor';
              }
              if (id.includes('@sentry')) {
                return 'sentry-vendor';
              }
              if (id.includes('@tanstack') || id.includes('react-query')) {
                return 'query-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  }
})

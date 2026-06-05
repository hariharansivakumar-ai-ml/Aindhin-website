import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Custom build plugin to inject dynamic app version and write version.json to output directory.
 */
function buildVersionPlugin() {
  const version = Date.now().toString()
  return {
    name: 'build-version-plugin',
    config() {
      return {
        define: {
          __APP_VERSION__: JSON.stringify(version)
        }
      }
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true })
      }
      fs.writeFileSync(
        path.join(distDir, 'version.json'),
        JSON.stringify({ version }, null, 2),
        'utf-8'
      )
      console.log(`[Version Plugin] version.json written with version: ${version}`)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), buildVersionPlugin()],
    base: '/',
    build: {
        outDir: 'dist',
        manifest: true,
        emptyOutDir: true,
        sourcemap: false,
        assetsInlineLimit: 0, // Disable inlining to prevent small SVGs/images from being bundled as JS modules
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                }
            }
        }
    }
})

import { defineConfig, loadEnv } from 'vite'
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
      
      let entryFile = ''
      const assetsDir = path.join(distDir, 'assets')
      if (fs.existsSync(assetsDir)) {
        const files = fs.readdirSync(assetsDir)
        const indexFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'))
        if (indexFile) {
          entryFile = `/assets/${indexFile}`
        }
      }

      fs.writeFileSync(
        path.join(distDir, 'version.json'),
        JSON.stringify({ version, entry: entryFile }, null, 2),
        'utf-8'
      )
      console.log(`[Version Plugin] version.json written with version: ${version} and entry: ${entryFile}`)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // Load env variables based on development/production mode
    const env = loadEnv(mode, process.cwd(), '')
    const backendUrl = env.VITE_API_URL || 'https://api2.aindhin.com/api'
    
    // Extract backend origin (e.g. http://localhost:5000 or https://api2.aindhin.com)
    let backendOrigin = 'http://localhost:5000'
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
                // Proxy all /api requests to the backend server
                '/api': {
                    target: backendOrigin,
                    changeOrigin: true
                },
                // Proxy /sitemap.xml request directly to backend /api/sitemap.xml
                '/sitemap.xml': {
                    target: `${backendOrigin}/api/sitemap.xml`,
                    changeOrigin: true,
                    rewrite: () => ''
                }
            }
        },
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
    }
})

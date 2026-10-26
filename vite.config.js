import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Forward same-origin /api requests to the backend, mirroring the rewrite in vercel.json.
  const { API_PROXY_TARGET = 'http://localhost:5000' } = loadEnv(mode, process.cwd(), '')
  const proxy = { '/api': { target: API_PROXY_TARGET, changeOrigin: true } }

  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  }
})

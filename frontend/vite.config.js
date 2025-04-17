import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/static/' : '/',  // ✅ conditional base
  build: {
    outDir: '../backend/static',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    open: true,
    strictPort: true,
    watch: {
      usePolling: true,
    },
    // Optional: handles /dashboard refresh 404s
    historyApiFallback: true,
  },
}))

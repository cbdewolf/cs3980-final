import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/static/', // ✅ this tells React to use /static/ for all assets
  build: {
    outDir: '../backend/static',
    emptyOutDir: true,
  },
})

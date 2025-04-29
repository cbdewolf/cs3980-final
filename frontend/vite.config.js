import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/static/' : '/',
  build: {
    outDir: '../backend/static', // ✅ MUST match FastAPI
    emptyOutDir: true,
  },
}));

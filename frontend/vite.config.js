import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://machin-test-xhbd-backend.vercel.app/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  base: '/',
})

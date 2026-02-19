import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'frontend',
  plugins: [react({
    jsxRuntime: 'automatic',
  }), tailwindcss()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  // Ei ongsho-tuku add korun jeno React-ke global dore ney
  define: {
    'process.env': {}
  }
})
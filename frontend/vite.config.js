import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
 
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    tailwindcss()
  ],
  build: {
    outDir: 'dist', 
    emptyOutDir: true,
  },
  define: {
    'process.env': {},
    'global': 'window',
  }
})
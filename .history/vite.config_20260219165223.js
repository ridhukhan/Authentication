import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'frontend',
  plugins: [
    react({
      jsxRuntime: 'automatic', // Eita React-is-not-defined solve kore
    }),
    tailwindcss()
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  }
})
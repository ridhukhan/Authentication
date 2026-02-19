import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Vite-ke bolchi frontend folder-e dhuke kaaj korte
  root: 'frontend',
  plugins: [
    react({
      // Eita React 19 ar Vite-er moddhe connection thik rakhe
      jsxRuntime: 'automatic',
    }),
    tailwindcss()
  ],
  build: {
    // Build hobar por file baire 'dist' folder-e jabe
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Dependencies thik moto load korar jonno
        manualChunks: undefined,
      },
    },
  },
  // Browser-e process.env error thamanor jonno
  define: {
    'process.env': {},
    'global': 'window',
  }
})
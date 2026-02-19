import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'frontend',
  plugins: [
    react({
      // Eita 100% nishchit kore jeno manual 'import React' na lagleo error na dey
      jsxRuntime: 'automatic',
    }),
    tailwindcss()
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Build-er somoy dependencies gulo ke thik moto map korar jonno
        manualChunks: undefined,
      },
    },
  },
  // Global variable mismatch solve korar jonno
  define: {
    'process.env': {}
  }
})
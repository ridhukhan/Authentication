import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // root সরিয়ে দাও, দরকার নেই
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    tailwindcss()
  ],
  build: {
    outDir: 'dist', // সরাসরি dist, ../ দরকার নেই
    emptyOutDir: true,
  },
  define: {
    'process.env': {},
    'global': 'window',
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: 'frontend',
  plugins: [
    react({
      // Eita nishchit kore je Vite auto-import handle korbe
      jsxRuntime: 'automatic',
    }),
    tailwindcss()
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // Build-er somoy jeno React-ke global na khuje bundle theke ney
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  // Ei ongsho-tuku 'React is not defined' error-er ashol osud
  define: {
    'global': 'window',
    'React': 'React' 
  }
})
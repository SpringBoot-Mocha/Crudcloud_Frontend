import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Optimizaciones de Build
  build: {
    outDir: 'dist',

    // Chunking optimizado
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar librerías grandes en chunks independientes
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-ui': ['lucide-react'],
          'vendor-utils': ['clsx', 'zod'],
        },
        // Optimizar nombres de archivos
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    // Minificación agresiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.log en producción
        drop_debugger: true,
      },
    },

    // Source maps para desarrollo
    sourcemap: process.env.NODE_ENV !== 'production',

    // Bundle analysis
    reportCompressedSize: false,
  },

  // Optimizaciones de desarrollo
  server: {
    port: 3000,
    open: true, // Abrir navegador automáticamente
  },

  // Previsualización
  preview: {
    port: 4173,
  },

  // Resolución de imports
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
    },
  },

  // Variables de entorno
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
})

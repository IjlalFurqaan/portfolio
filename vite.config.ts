import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
    }),
  ],
  build: {
    // Optimize bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['gsap'],
          icons: ['lucide-react'],
        },
      },
    },
    // Reduce bundle size
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Development server optimizations
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    // Pre-bundle dependencies
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
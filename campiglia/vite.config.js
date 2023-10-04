import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/firestore', // Add the required Firebase modules here
    ],
  },
  build: {
    rollupOptions: {
      external: ['firebase/firestore', 'firebase/app'], // Add the Firebase module to externalize
    },
  },
})

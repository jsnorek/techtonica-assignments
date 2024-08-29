import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//the proxy is directing frontend and backend to each other
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // matches server.js port
      // '/': 'http://localhost:5003'
       // Redirect API calls to the backend server
      //  '/location': {
      //   target: 'http://localhost:5003', // Backend server URL and port
      //   changeOrigin: true,
      // },
      // '/': {
      //   target: 'http://localhost:5003', // Default route for backend
      //   changeOrigin: true,
      // }
        '/location:location': 'http://localhost:5003',
    }
  }
});

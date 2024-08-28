import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//the proxy is directing frontend and backend to each other
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // matches server.js port
      '/': 'http://localhost:5003'
    }
  }
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: {
      '/blogs': {
        target: 'http://localhost:3000',
      },
      '/users': {
        target: 'http://localhost:3000',
      },
    }
  }
})

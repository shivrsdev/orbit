import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

const serverProxy = {
  target: 'http://localhost:3000',
  ws: true,
  secure: false
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    proxy: {
      '/auth': serverProxy,
      '/api': serverProxy
    }
  }
})

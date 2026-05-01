import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/audit-ui-poc/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://srere-nxt.soccer-dev.aws.private',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})


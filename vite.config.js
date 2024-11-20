import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/ikcount': {
        target: 'https://ikcount.com',
        changeOrigin: true,
        secure: true, // Asegúrate de que esto esté en true para HTTPS
        rewrite: (path) => path.replace(/^\/ikcount/, ''),
      },
    },
  },
})

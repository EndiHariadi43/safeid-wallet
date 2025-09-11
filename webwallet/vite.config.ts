import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * BASE PATH
 * - Untuk GitHub Pages (Project Pages), situs berada di subpath: /<repo>/
 * - Kita ambil dari env BASE_PATH (dikirim dari workflow). Default ke '/safeid-wallet/'.
 * - Preview Pages PR juga berada di bawah /safeid-wallet/, jadi aman.
 */
const base = process.env.BASE_PATH || '/safeid-wallet/'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    target: 'es2020',
    sourcemap: true,          // memudahkan debugging
    chunkSizeWarningLimit: 700,
    assetsInlineLimit: 0,     // simpan asset sebagai file terpisah (lebih cacheable)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'ethers']
        }
      }
    }
  }
})

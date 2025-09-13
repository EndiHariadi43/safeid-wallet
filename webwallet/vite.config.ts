import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BUILD_TARGET=pages  -> untuk GitHub Pages
// (tanpa BUILD_TARGET) -> untuk Android/desktop dev
export default defineConfig(() => {
  const isPages = process.env.BUILD_TARGET === 'pages'
  // Jika Anda sudah menyetel BASE_PATH di deploy.yml, pakai itu; fallback ke '/safeid-wallet/'
  const pagesBase = process.env.BASE_PATH ?? '/safeid-wallet/'

  return {
    plugins: [react()],
    base: isPages ? pagesBase : '/',      // Android/Local = '/'
    build: {
      outDir: 'dist',
      sourcemap: true,                    // berguna untuk debugging CI/Pages
    },
    // Optional: akses dari perangkat lain di jaringan saat dev
    // server: { host: true, port: 5173 },
  }
})

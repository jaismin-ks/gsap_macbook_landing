import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves from /gsap_macbook_landing/; Vercel and local serve from /
  base: process.env.GH_PAGES ? '/gsap_macbook_landing/' : '/'
})

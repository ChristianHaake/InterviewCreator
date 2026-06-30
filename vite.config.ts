import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'InterviewDesigner',
        short_name: 'Interview',
        description: 'Planungswerkzeug für Interviews',
        theme_color: '#ffffff',
      }
    })
  ],
})

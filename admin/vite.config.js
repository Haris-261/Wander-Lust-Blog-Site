import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  // Allow ADMIN_* from admin/.env (in addition to default VITE_*)
  envPrefix: ['VITE_', 'ADMIN_'],
  server: {
    port: 5174,
  },
})

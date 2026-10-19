import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Los recursos visuales del proyecto se almacenan en src/assets.
  // Vite los publica con rutas como /imagenes/... y /Videos/... para que
  // las referencias existentes sigan funcionando sin una carpeta public.
  publicDir: "src/assets",
})

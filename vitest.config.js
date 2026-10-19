/**
 * Configuración exclusiva de Vitest.
 * jsdom crea un navegador simulado para probar componentes React sin abrir
 * Vite. El patrón include separa estas cuatro pruebas del conjunto histórico
 * de pruebas de servicios que se mantiene en tests/.
 */
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
    include: ["src/tests/**/*.test.{js,jsx}"],
    clearMocks: true,
    restoreMocks: true,
  },
});

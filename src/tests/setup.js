/**
 * Preparación común para todas las pruebas de interfaz.
 * jest-dom incorpora aserciones legibles, por ejemplo toBeDisabled(), y
 * cleanup elimina el DOM simulado al terminar cada prueba para que no se
 * mezclen los resultados de una prueba con la siguiente.
 */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

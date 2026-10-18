import { guardarSesion, leerSesion } from "./storageService.js";

const CLAVE_DIARIO = "tarot-react-diario";

/** El diario utiliza storageService igual que el carrito y las reservas. */
export function obtenerEntradas() {
  const entradas = leerSesion(CLAVE_DIARIO, []);
  return Array.isArray(entradas) ? entradas : [];
}

/** Un id existente actualiza la entrada; sin id se crea una nueva. */
export function guardarEntrada(datos) {
  const entrada = {
    id: datos.id || crypto.randomUUID(),
    fecha: datos.fecha,
    pregunta: datos.pregunta.trim(),
    carta: datos.carta.trim(),
    observaciones: datos.observaciones.trim(),
    accion: datos.accion.trim(),
  };
  if (
    !entrada.fecha ||
    !entrada.pregunta ||
    !entrada.carta ||
    !entrada.observaciones
  ) {
    throw new Error(
      "Completa la fecha, la pregunta, la carta y tus observaciones.",
    );
  }
  const entradas = obtenerEntradas();
  const indice = entradas.findIndex((actual) => actual.id === entrada.id);
  if (indice >= 0) entradas[indice] = entrada;
  else entradas.unshift(entrada);
  return guardarSesion(CLAVE_DIARIO, entradas);
}

/** La confirmación pertenece a la pantalla; el servicio solo guarda el resultado. */
export function eliminarEntrada(id) {
  return guardarSesion(
    CLAVE_DIARIO,
    obtenerEntradas().filter((entrada) => entrada.id !== id),
  );
}

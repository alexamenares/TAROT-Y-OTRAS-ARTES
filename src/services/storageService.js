/**
 * ADAPTADOR DE ALMACENAMIENTO · Los servicios no repiten el manejo de JSON.
 * La lectura devuelve respaldo si falta la clave, el JSON está dañado o el
 * navegador bloquea el acceso. La escritura propaga el error: así una pantalla
 * puede informar que no guardó, en lugar de mostrar una confirmación falsa.
 */
export function leerSesion(clave, respaldo) {
  try {
    const valor = sessionStorage.getItem(clave);
    return valor === null ? respaldo : JSON.parse(valor);
  } catch {
    return respaldo;
  }
}

export function guardarSesion(clave, valor) {
  // Storage solo acepta texto. JSON.stringify conserva la estructura del objeto.
  sessionStorage.setItem(clave, JSON.stringify(valor));
  return valor;
}

export function eliminarSesion(clave) {
  // Eliminar una clave no vacía los demás datos de la sesión del navegador.
  sessionStorage.removeItem(clave);
}

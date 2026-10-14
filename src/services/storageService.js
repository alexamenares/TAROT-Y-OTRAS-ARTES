/*
 * Encapsula sessionStorage para que los servicios de dominio no repitan
 * manejo de JSON ni fallen cuando el navegador bloquee temporalmente el acceso.
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
  sessionStorage.setItem(clave, JSON.stringify(valor));
  return valor;
}

export function eliminarSesion(clave) {
  sessionStorage.removeItem(clave);
}

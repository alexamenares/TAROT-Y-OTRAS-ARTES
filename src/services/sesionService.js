/**
 * SESIÓN SIMULADA · Aísla la clave tarot-react-usuario del resto del proyecto.
 * Solo conserva nombre y correo. Cerrar sesión elimina esta identidad;
 * el comportamiento existente conserva carrito, diario y reservas de la pestaña.
 */
import { eliminarSesion, guardarSesion, leerSesion } from "./storageService";

const CLAVE_USUARIO = "tarot-react-usuario";

/* La sesión simulada solo conserva identidad básica; nunca almacena contraseña. */
export function obtenerUsuario() {
  return leerSesion(CLAVE_USUARIO, null);
}

export function iniciarSesion({ nombre = "Visitante", correo }) {
  return guardarSesion(CLAVE_USUARIO, { nombre, correo });
}

export function cerrarSesion() {
  eliminarSesion(CLAVE_USUARIO);
}

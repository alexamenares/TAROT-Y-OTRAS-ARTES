import { guardarSesion, leerSesion } from "./storageService";

const CLAVE_RESERVAS = "tarot-react-reservas";

/* Las reservas temporales se separan del carrito porque aún no tienen pago. */
export function obtenerReservas() {
  const reservas = leerSesion(CLAVE_RESERVAS, []);
  return Array.isArray(reservas) ? reservas : [];
}

export function crearReserva(datos) {
  const reservas = obtenerReservas();
  const reserva = { ...datos, id: `RES-${Date.now()}`, creadaEn: new Date().toISOString() };
  guardarSesion(CLAVE_RESERVAS, [...reservas, reserva]);
  return reserva;
}

export function cancelarReserva(id) {
  const reservas = obtenerReservas().filter((reserva) => reserva.id !== id);
  guardarSesion(CLAVE_RESERVAS, reservas);
  return reservas;
}

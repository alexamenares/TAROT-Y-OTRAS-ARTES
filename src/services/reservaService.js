import { guardarSesion, leerSesion } from "./storageService.js";
import profesionales from "../data/profesionales.js";

const CLAVE_RESERVAS = "tarot-react-reservas";

/**
 * Regla de agenda: un profesional solo puede atender una reserva en una
 * fecha y hora concretas. Usamos su id estable, no el nombre visible.
 */
function claveHorario({ profesionalId, fecha, horario }) {
  return `${profesionalId}|${fecha}|${horario}`;
}

/**
 * La versión anterior podía guardar citas repetidas. Conservamos la primera
 * de cada horario al leer, sin escribir durante el render de React.
 * El próximo guardado consolida esta lista en sessionStorage.
 */
export function obtenerReservas() {
  const reservas = leerSesion(CLAVE_RESERVAS, []);
  if (!Array.isArray(reservas)) return [];
  const vistos = new Set();
  return reservas.filter((reserva) => {
    if (!reserva?.profesionalId || !reserva.fecha || !reserva.horario)
      return false;
    const clave = claveHorario(reserva);
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });
}

/** La interfaz consulta la misma regla para marcar los horarios ocupados. */
export function estaHorarioOcupado(seleccion, reservas = obtenerReservas()) {
  return reservas.some(
    (reserva) => claveHorario(reserva) === claveHorario(seleccion),
  );
}

/**
 * Revalidamos JUSTO antes de escribir: deshabilitar un botón no protege de
 * dobles envíos ni de formularios que quedaron abiertos. Estas operaciones
 * son síncronas dentro de la pestaña. sessionStorage no coordina agendas
 * entre dispositivos ni entre pestañas independientes.
 */
export function crearReserva(datos) {
  const profesional = profesionales.find(
    (persona) => persona.id === datos.profesionalId,
  );
  if (!profesional || profesional.especialidad !== datos.especialidad) {
    throw new Error("Selecciona un profesional de la especialidad elegida.");
  }
  if (
    !profesional.fechas.includes(datos.fecha) ||
    !profesional.horarios.includes(datos.horario)
  ) {
    throw new Error(
      "Selecciona una fecha y un horario disponibles para ese profesional.",
    );
  }
  const reservas = obtenerReservas();
  if (estaHorarioOcupado(datos, reservas)) {
    throw new Error(
      "Este profesional ya tiene una reserva en esa fecha y hora. Elige otro horario.",
    );
  }
  const reserva = {
    ...datos,
    profesional: profesional.nombre,
    id: `RES-${crypto.randomUUID()}`,
    creadaEn: new Date().toISOString(),
  };
  guardarSesion(CLAVE_RESERVAS, [...reservas, reserva]);
  return reserva;
}

/** Cancelar también libera el horario para volver a reservarlo. */
export function cancelarReserva(id) {
  const reservas = obtenerReservas().filter((reserva) => reserva.id !== id);
  guardarSesion(CLAVE_RESERVAS, reservas);
  return reservas;
}

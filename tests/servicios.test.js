/**
 * Regresiones de reglas de negocio con el runner incorporado de Node.
 * El almacenamiento en memoria reemplaza sessionStorage solo en estas pruebas;
 * la aplicación continúa utilizando el almacenamiento real de la pestaña.
 */
import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import profesionales from "../src/data/profesionales.js";
import {
  cancelarReserva,
  crearReserva,
  estaHorarioOcupado,
  obtenerReservas,
} from "../src/services/reservaService.js";
import {
  eliminarEntrada,
  guardarEntrada,
  obtenerEntradas,
} from "../src/services/bibliotecaService.js";

const memoria = new Map();
Object.defineProperty(globalThis, "sessionStorage", {
  configurable: true,
  value: {
    getItem: (clave) => memoria.get(clave) ?? null,
    setItem: (clave, valor) => memoria.set(clave, String(valor)),
    removeItem: (clave) => memoria.delete(clave),
  },
});
beforeEach(() => memoria.clear());
const profesional = profesionales[0];
const cita = {
  profesionalId: profesional.id,
  especialidad: profesional.especialidad,
  fecha: profesional.fechas[0],
  horario: profesional.horarios[0],
};

test("un doble envío no crea dos citas para el mismo profesional, fecha y hora", () => {
  crearReserva(cita);
  assert.throws(() => crearReserva({ ...cita }), /ya tiene una reserva/);
  assert.equal(obtenerReservas().length, 1);
  assert.equal(JSON.parse(memoria.get("tarot-react-reservas")).length, 1);
});

test("el mismo profesional puede reservar otro día u otro horario", () => {
  crearReserva(cita);
  crearReserva({ ...cita, fecha: profesional.fechas[1] });
  crearReserva({ ...cita, horario: profesional.horarios[1] });
  assert.equal(obtenerReservas().length, 3);
  assert.equal(new Set(obtenerReservas().map((reserva) => reserva.id)).size, 3);
});

test("la ocupación de un profesional no bloquea a otro a la misma hora", () => {
  crearReserva(cita);
  assert.equal(
    estaHorarioOcupado({ ...cita, profesionalId: profesionales[1].id }),
    false,
  );
  assert.equal(estaHorarioOcupado(cita), true);
});

test("cancelar libera el horario y permite volver a reservarlo", () => {
  const reserva = crearReserva(cita);
  cancelarReserva(reserva.id);
  assert.equal(estaHorarioOcupado(cita), false);
  const nueva = crearReserva(cita);
  assert.notEqual(nueva.id, reserva.id);
  assert.equal(obtenerReservas().length, 1);
});

test("rechaza combinaciones ajenas a la agenda del profesional", () => {
  for (const cambio of [
    { horario: "03:45" },
    { fecha: "2000-01-01" },
    { profesionalId: "inexistente" },
    { especialidad: "otra" },
  ]) {
    assert.throws(() => crearReserva({ ...cita, ...cambio }));
  }
  assert.equal(obtenerReservas().length, 0);
});

test("consolida duplicados de la versión anterior y los elimina juntos al cancelar", () => {
  memoria.set(
    "tarot-react-reservas",
    JSON.stringify([
      { ...cita, id: "primera" },
      { ...cita, id: "duplicada" },
    ]),
  );
  assert.equal(obtenerReservas().length, 1);
  cancelarReserva("primera");
  assert.deepEqual(JSON.parse(memoria.get("tarot-react-reservas")), []);
});

test("datos ausentes o JSON dañado no impiden abrir reservas ni diario", () => {
  memoria.set("tarot-react-reservas", "incompleto{");
  memoria.set("tarot-react-diario", "null");
  assert.deepEqual(obtenerReservas(), []);
  assert.deepEqual(obtenerEntradas(), []);
});

test("el diario crea, recupera, edita sin duplicar y elimina una entrada", () => {
  const datos = {
    fecha: cita.fecha,
    pregunta: " ¿Qué observar? ",
    carta: "El Mago",
    observaciones: "Reconocer recursos.",
    accion: "Anotar una habilidad.",
  };
  const [entrada] = guardarEntrada(datos);
  assert.equal(obtenerEntradas()[0].pregunta, "¿Qué observar?");
  guardarEntrada({ ...entrada, observaciones: "Una nueva observación." });
  assert.equal(obtenerEntradas().length, 1);
  assert.equal(obtenerEntradas()[0].observaciones, "Una nueva observación.");
  assert.deepEqual(eliminarEntrada(entrada.id), []);
});

test("el diario rechaza campos obligatorios vacíos sin escribir", () => {
  assert.throws(
    () =>
      guardarEntrada({
        fecha: cita.fecha,
        pregunta: " ",
        carta: "El Sol",
        observaciones: " ",
        accion: "",
      }),
    /Completa/,
  );
  assert.equal(memoria.has("tarot-react-diario"), false);
});

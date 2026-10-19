/**
 * Regresiones de reglas de negocio (reservas y biblioteca) con Vitest.
 * El almacenamiento en memoria reemplaza sessionStorage solo en estas pruebas;
 * la aplicación continúa utilizando el almacenamiento real de la pestaña.
 */
import { beforeEach, describe, expect, it } from "vitest";
import profesionales from "../data/profesionales.js";
import {
  cancelarReserva,
  crearReserva,
  estaHorarioOcupado,
  obtenerReservas,
} from "../services/reservaService.js";
import {
  eliminarEntrada,
  guardarEntrada,
  obtenerEntradas,
} from "../services/bibliotecaService.js";

// Mock de sessionStorage con un Map en memoria (aislado del navegador real).
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

describe("reservaService — reglas de agenda", () => {
  it("un doble envío no crea dos citas para el mismo profesional, fecha y hora", () => {
    crearReserva(cita);
    expect(() => crearReserva({ ...cita })).toThrow(/ya tiene una reserva/);
    expect(obtenerReservas()).toHaveLength(1);
    expect(JSON.parse(memoria.get("tarot-react-reservas"))).toHaveLength(1);
  });

  it("el mismo profesional puede reservar otro día u otro horario", () => {
    crearReserva(cita);
    crearReserva({ ...cita, fecha: profesional.fechas[1] });
    crearReserva({ ...cita, horario: profesional.horarios[1] });
    expect(obtenerReservas()).toHaveLength(3);
    expect(new Set(obtenerReservas().map((r) => r.id)).size).toBe(3);
  });

  it("la ocupación de un profesional no bloquea a otro a la misma hora", () => {
    crearReserva(cita);
    expect(
      estaHorarioOcupado({ ...cita, profesionalId: profesionales[1].id }),
    ).toBe(false);
    expect(estaHorarioOcupado(cita)).toBe(true);
  });

  it("cancelar libera el horario y permite volver a reservarlo", () => {
    const reserva = crearReserva(cita);
    cancelarReserva(reserva.id);
    expect(estaHorarioOcupado(cita)).toBe(false);
    const nueva = crearReserva(cita);
    expect(nueva.id).not.toBe(reserva.id);
    expect(obtenerReservas()).toHaveLength(1);
  });

  it("rechaza combinaciones ajenas a la agenda del profesional", () => {
    for (const cambio of [
      { horario: "03:45" },
      { fecha: "2000-01-01" },
      { profesionalId: "inexistente" },
      { especialidad: "otra" },
    ]) {
      expect(() => crearReserva({ ...cita, ...cambio })).toThrow();
    }
    expect(obtenerReservas()).toHaveLength(0);
  });

  it("consolida duplicados de la versión anterior y los elimina juntos al cancelar", () => {
    memoria.set(
      "tarot-react-reservas",
      JSON.stringify([
        { ...cita, id: "primera" },
        { ...cita, id: "duplicada" },
      ]),
    );
    expect(obtenerReservas()).toHaveLength(1);
    cancelarReserva("primera");
    expect(JSON.parse(memoria.get("tarot-react-reservas"))).toEqual([]);
  });
});

describe("bibliotecaService — diario personal", () => {
  it("el diario crea, recupera, edita sin duplicar y elimina una entrada", () => {
    const datos = {
      fecha: cita.fecha,
      pregunta: " ¿Qué observar? ",
      carta: "El Mago",
      observaciones: "Reconocer recursos.",
      accion: "Anotar una habilidad.",
    };
    const [entrada] = guardarEntrada(datos);
    expect(obtenerEntradas()[0].pregunta).toBe("¿Qué observar?");
    guardarEntrada({ ...entrada, observaciones: "Una nueva observación." });
    expect(obtenerEntradas()).toHaveLength(1);
    expect(obtenerEntradas()[0].observaciones).toBe("Una nueva observación.");
    expect(eliminarEntrada(entrada.id)).toEqual([]);
  });

  it("el diario rechaza campos obligatorios vacíos sin escribir", () => {
    expect(() =>
      guardarEntrada({
        fecha: cita.fecha,
        pregunta: " ",
        carta: "El Sol",
        observaciones: " ",
        accion: "",
      }),
    ).toThrow(/Completa/);
    expect(memoria.has("tarot-react-diario")).toBe(false);
  });
});

describe("resiliencia del storage", () => {
  it("datos ausentes o JSON dañado no impiden abrir reservas ni diario", () => {
    memoria.set("tarot-react-reservas", "incompleto{");
    memoria.set("tarot-react-diario", "null");
    expect(obtenerReservas()).toEqual([]);
    expect(obtenerEntradas()).toEqual([]);
  });
});
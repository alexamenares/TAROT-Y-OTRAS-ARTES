/**
 * Pruebas de tres páginas del proyecto:
 *  8. NoEncontrada — renderiza el 404 y ofrece un enlace de regreso.
 *  9. Contacto     — valida campos vacíos sin enviar el formulario.
 * 10. Registro     — valida campos vacíos sin iniciar sesión ni navegar.
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock de useSesion para aislar Registro del sessionStorage real.
vi.mock("../contexts/SesionContext", () => ({
  useSesion: vi.fn(),
}));

import NoEncontrada from "../pages/NoEncontrada";
import Contacto from "../pages/Contacto";
import Registro from "../pages/Registro";
import { useSesion } from "../contexts/SesionContext";

describe("Pruebas unitarias de páginas", () => {
  beforeEach(() => {
    useSesion.mockReturnValue({ usuario: null, ingresar: vi.fn() });
  });

  it("8. NoEncontrada muestra el mensaje 404 y un enlace al inicio", () => {
    render(
      <MemoryRouter>
        <NoEncontrada />
      </MemoryRouter>,
    );

    expect(screen.getByText("Error 404")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Esta página no está en la baraja" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Volver al inicio" }),
    ).toHaveAttribute("href", "/");
  });

  it("9. Contacto valida campos vacíos y muestra alerta sin enviar", async () => {
    const usuario = userEvent.setup();
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>,
    );

    await usuario.click(
      screen.getByRole("button", { name: "Enviar mensaje simulado" }),
    );

    expect(
      screen.getByText("Ingresa tu nombre completo."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ingresa un correo electrónico válido."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Revisa los campos marcados antes de enviar tu mensaje.",
      ),
    ).toBeInTheDocument();
  });

  it("10. Registro valida campos vacíos sin iniciar sesión ni navegar", async () => {
    const ingresarMock = vi.fn();
    useSesion.mockReturnValue({ usuario: null, ingresar: ingresarMock });

    const usuario = userEvent.setup();
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/registro", state: { desdeIngreso: true } },
        ]}
      >
        <Registro />
      </MemoryRouter>,
    );

    await usuario.click(
      screen.getByRole("button", { name: "Crear cuenta y continuar" }),
    );

    // Los cuatro campos obligatorios quedan marcados como error.
    expect(
      screen.getByText("Ingresa tu nombre completo."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Ingresa un correo electrónico válido."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("La contraseña debe contener entre 8 y 72 caracteres."),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Debes aceptar el tratamiento de datos para continuar.",
      ),
    ).toBeInTheDocument();

    // Y no se crea sesión ni se navega a /agenda.
    expect(ingresarMock).not.toHaveBeenCalled();
  });
});
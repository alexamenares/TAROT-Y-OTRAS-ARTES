/**
 * Cuatro pruebas unitarias de componentes frontend.
 *
 * React Testing Library consulta el DOM como lo haría una persona usuaria:
 * por etiquetas, botones, enlaces y texto visible. Vitest ejecuta las
 * aserciones y vi.mock sustituye dependencias que no son el objetivo de la
 * prueba, como la sesión simulada.
 */
import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TarjetaProducto from "../components/molecules/TarjetaProducto";
import ControlCantidad from "../components/molecules/ControlCantidad";
import RutaProtegida from "../components/organisms/RutaProtegida";
import Ingresar from "../pages/Ingresar";
import { useSesion } from "../contexts/SesionContext";

// La prueba no debe leer sessionStorage ni iniciar una sesión real. Este mock
// permite decidir si el componente ve a una persona usuaria o no.
vi.mock("../contexts/SesionContext", () => ({
  useSesion: vi.fn(),
}));

const productoPrueba = {
  id: "mazo-prueba",
  nombre: "Mazo de prueba",
  categoria: "Mazos, oráculos y runas",
  precio: 24990,
  descripcion: "Producto usado solamente para comprobar la tarjeta.",
  imagen: "/imagenes/productos/mazo-clasico-tarot.png",
  alt: "Mazo de prueba",
};

/*
 * ControlCantidad no guarda su propia cantidad: el componente padre decide el
 * valor. Este pequeño contenedor reproduce esa relación real para comprobar
 * que los clics actualizan el DOM y respetan los límites.
 */
function ControlCantidadConEstado() {
  const [cantidad, setCantidad] = useState(1);

  return (
    <ControlCantidad
      cantidad={cantidad}
      maximo={2}
      nombre="Mazo de prueba"
      onRestar={() => setCantidad((actual) => actual - 1)}
      onSumar={() => setCantidad((actual) => actual + 1)}
    />
  );
}

/* Muestra en pantalla la ruta actual para poder verificar la redirección. */
function UbicacionActual() {
  const location = useLocation();
  return (
    <output data-testid="ubicacion-actual">
      {location.pathname}|{location.state?.desde ?? ""}
    </output>
  );
}

describe("Pruebas unitarias de componentes frontend", () => {
  beforeEach(() => {
    useSesion.mockReturnValue({ usuario: null, ingresar: vi.fn() });
  });

  it("1. muestra los datos recibidos y el enlace correcto en una tarjeta de producto", () => {
    render(
      <MemoryRouter>
        <TarjetaProducto producto={productoPrueba} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Mazo de prueba" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Mazos, oráculos y runas")).toBeInTheDocument();
    expect(screen.getByText(/\$24\.990/)).toBeInTheDocument();
    // React Bootstrap presenta este enlace como botón para conservar el estilo
    // y la semántica de acción del catálogo.
    expect(
      screen.getByRole("button", { name: "Ver producto" }),
    ).toHaveAttribute("href", "/tienda/mazo-prueba");
  });

  it("2. actualiza la cantidad visible y bloquea los botones en los límites", async () => {
    const usuario = userEvent.setup();
    render(<ControlCantidadConEstado />);

    const restar = screen.getByRole("button", {
      name: "Restar una unidad de Mazo de prueba",
    });
    const sumar = screen.getByRole("button", {
      name: "Agregar una unidad de Mazo de prueba",
    });

    expect(restar).toBeDisabled();
    expect(screen.getByText("1", { selector: "output" })).toBeInTheDocument();

    await usuario.click(sumar);
    expect(screen.getByText("2", { selector: "output" })).toBeInTheDocument();
    expect(sumar).toBeDisabled();

    await usuario.click(restar);
    expect(screen.getByText("1", { selector: "output" })).toBeInTheDocument();
    expect(restar).toBeDisabled();
  });

  it("3. valida en el DOM un correo inválido antes de intentar iniciar sesión", async () => {
    const usuario = userEvent.setup();
    const ingresarSimulado = vi.fn();
    useSesion.mockReturnValue({ usuario: null, ingresar: ingresarSimulado });

    render(
      <MemoryRouter>
        <Ingresar />
      </MemoryRouter>,
    );

    await usuario.type(
      screen.getByLabelText("Correo electrónico"),
      "correo-invalido",
    );

    expect(
      screen.getByText("Ingresa un correo electrónico válido."),
    ).toBeInTheDocument();
    expect(ingresarSimulado).not.toHaveBeenCalled();
  });

  it("4. redirige una ruta protegida al ingreso y conserva el destino solicitado", async () => {
    render(
      <MemoryRouter initialEntries={["/agenda"]}>
        <Routes>
          <Route
            path="/agenda"
            element={
              <RutaProtegida>
                <p>Agenda privada</p>
              </RutaProtegida>
            }
          />
          {/* Esta ruta recibe el Navigate y evita repetir la redirección. */}
          <Route path="/ingresar" element={<UbicacionActual />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("ubicacion-actual")).toHaveTextContent(
        "/ingresar|/agenda",
      );
    });
    expect(screen.queryByText("Agenda privada")).not.toBeInTheDocument();
  });
});

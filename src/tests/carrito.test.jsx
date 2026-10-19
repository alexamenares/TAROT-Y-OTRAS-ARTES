/**
 * Pruebas del CarritoProvider: verifica que el estado compartido se
 * inicialice desde el servicio y que las acciones agregar/vaciar actualicen
 * las líneas y las propiedades derivadas (subtotal, totalUnidades).
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock del servicio para aislar el provider del sessionStorage real.
vi.mock("../services/carritoService", () => ({
  obtenerCarrito: vi.fn(),
  agregarItem: vi.fn(),
  actualizarCantidad: vi.fn(),
  eliminarItem: vi.fn(),
  vaciarCarrito: vi.fn(),
  calcularSubtotal: vi.fn(),
}));

import { CarritoProvider, useCarrito } from "../contexts/CarritoContext";
import * as carritoService from "../services/carritoService";

/*
 * Consumidor mínimo: muestra en el DOM las propiedades del contexto y expone
 * botones para disparar agregar() y vaciar(). Así la prueba verifica el
 * comportamiento observable, no la implementación interna.
 */
function Consumidor() {
  const { lineas, subtotal, totalUnidades, agregar, vaciar } = useCarrito();
  return (
    <div>
      <output data-testid="lineas">{lineas.length}</output>
      <output data-testid="subtotal">{subtotal}</output>
      <output data-testid="total-unidades">{totalUnidades}</output>
      <button
        onClick={() =>
          agregar(
            { id: "1", tipo: "producto", nombre: "Mazo", precio: 10000 },
            1,
          )
        }
      >
        Agregar
      </button>
      <button onClick={vaciar}>Vaciar</button>
    </div>
  );
}

function renderProvider() {
  return render(
    <CarritoProvider>
      <Consumidor />
    </CarritoProvider>,
  );
}

describe("CarritoContext — estado compartido del carrito", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    carritoService.obtenerCarrito.mockReturnValue([]);
    // calcularSubtotal se recalcula con cada render, por eso usamos una
    // implementación que suma los precios reales, no un valor fijo.
    carritoService.calcularSubtotal.mockImplementation((lineas) =>
      lineas.reduce(
        (total, linea) => total + (linea.precio ?? 0) * (linea.cantidad ?? 0),
        0,
      ),
    );
  });

  it("5. inicia el carrito vacío cuando el servicio no devuelve líneas", () => {
    renderProvider();
    expect(screen.getByTestId("lineas")).toHaveTextContent("0");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("0");
    expect(screen.getByTestId("total-unidades")).toHaveTextContent("0");
  });

  it("6. agregar() llama al servicio y refleja las nuevas líneas en el DOM", async () => {
    const linea = {
      id: "1",
      tipo: "producto",
      nombre: "Mazo",
      precio: 10000,
      cantidad: 1,
    };
    carritoService.agregarItem.mockReturnValue({ lineas: [linea] });

    const usuario = userEvent.setup();
    renderProvider();
    await usuario.click(screen.getByRole("button", { name: "Agregar" }));

    expect(carritoService.agregarItem).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("lineas")).toHaveTextContent("1");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("10000");
    expect(screen.getByTestId("total-unidades")).toHaveTextContent("1");
  });

  it("7. vaciar() deja las líneas, el subtotal y las unidades en cero", async () => {
    const linea = {
      id: "1",
      tipo: "producto",
      nombre: "Mazo",
      precio: 10000,
      cantidad: 2,
    };
    carritoService.obtenerCarrito.mockReturnValue([linea]);
    carritoService.vaciarCarrito.mockReturnValue([]);

    const usuario = userEvent.setup();
    renderProvider();
    expect(screen.getByTestId("lineas")).toHaveTextContent("1");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("20000");

    await usuario.click(screen.getByRole("button", { name: "Vaciar" }));
    expect(carritoService.vaciarCarrito).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("lineas")).toHaveTextContent("0");
    expect(screen.getByTestId("subtotal")).toHaveTextContent("0");
    expect(screen.getByTestId("total-unidades")).toHaveTextContent("0");
  });
});




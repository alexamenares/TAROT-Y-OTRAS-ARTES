/**
 * ESTADO COMPARTIDO · Conecta acciones del catálogo con carrito y encabezado.
 * La inicialización perezosa lee storage una vez al montar el proveedor.
 * Cada acción llama al servicio y luego setLineas provoca el nuevo render.
 * Subtotal y cantidad se derivan de lineas, evitando totales desincronizados.
 */
import { createContext, useContext, useState } from "react";
import * as carritoService from "../services/carritoService";

const CarritoContext = createContext(null);

/*
 * Comparte el carrito entre catálogo, detalles, encabezado y checkout. Usar
 * Context evita duplicar un estado que cambia desde muchas rutas distintas.
 */
export function CarritoProvider({ children }) {
  const [lineas, setLineas] = useState(() => carritoService.obtenerCarrito());

  function agregar(item, cantidad) {
    const resultado = carritoService.agregarItem(item, cantidad);
    setLineas(resultado.lineas);
    return resultado;
  }

  function cambiarCantidad(tipo, id, cantidad) {
    const resultado = carritoService.actualizarCantidad(tipo, id, cantidad);
    setLineas(resultado.lineas);
    return resultado;
  }

  function eliminar(tipo, id) {
    setLineas(carritoService.eliminarItem(tipo, id));
  }

  function vaciar() {
    setLineas(carritoService.vaciarCarrito());
  }

  const valor = {
    lineas,
    agregar,
    cambiarCantidad,
    eliminar,
    vaciar,
    subtotal: carritoService.calcularSubtotal(lineas),
    totalUnidades: lineas.reduce((total, linea) => total + linea.cantidad, 0),
    contieneProductos: lineas.some((linea) => linea.tipo === "producto"),
  };

  return (
    <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
  );
}

/* El hook permanece junto al Provider para exponer una única API del carrito. */
// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  return useContext(CarritoContext);
}

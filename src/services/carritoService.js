import { guardarSesion, leerSesion } from "./storageService";

const CLAVE_CARRITO = "tarot-react-carrito";

function normalizarLinea(linea) {
  const esProducto = linea.tipo === "producto";
  const stock = esProducto ? Math.max(0, Number(linea.stock) || 0) : null;
  const cantidadSolicitada = Math.max(1, Number.parseInt(linea.cantidad, 10) || 1);
  return {
    ...linea,
    tipo: esProducto ? "producto" : "experiencia",
    cantidad: stock === null ? cantidadSolicitada : Math.min(cantidadSolicitada, stock),
    stock,
  };
}

/*
 * El carrito se guarda bajo tarot-react-carrito. Protege las reglas de cantidad
 * mínima, stock máximo y línea única por tipo e identificador.
 */
export function obtenerCarrito() {
  const lineas = leerSesion(CLAVE_CARRITO, []);
  return Array.isArray(lineas) ? lineas.map(normalizarLinea) : [];
}

export function guardarCarrito(lineas) {
  return guardarSesion(CLAVE_CARRITO, lineas.map(normalizarLinea));
}

export function agregarItem(item, cantidad = 1) {
  const lineas = obtenerCarrito();
  const nuevaLinea = normalizarLinea({ ...item, cantidad });
  const indice = lineas.findIndex((linea) => linea.tipo === nuevaLinea.tipo && String(linea.id) === String(nuevaLinea.id));

  if (indice >= 0) {
    const nuevaCantidad = lineas[indice].cantidad + nuevaLinea.cantidad;
    if (lineas[indice].stock !== null && nuevaCantidad > lineas[indice].stock) {
      return { lineas, exito: false, mensaje: `El stock máximo disponible es ${lineas[indice].stock}.` };
    }
    lineas[indice].cantidad = nuevaCantidad;
  } else {
    lineas.push(nuevaLinea);
  }

  return { lineas: guardarCarrito(lineas), exito: true, mensaje: `${nuevaLinea.nombre} fue agregado al carrito.` };
}

export function actualizarCantidad(tipo, id, cantidad) {
  const lineas = obtenerCarrito();
  const linea = lineas.find((elemento) => elemento.tipo === tipo && String(elemento.id) === String(id));
  if (!linea) return { lineas, exito: false, mensaje: "El elemento ya no está disponible." };

  const nuevaCantidad = Math.max(1, Number.parseInt(cantidad, 10) || 1);
  if (linea.stock !== null && nuevaCantidad > linea.stock) {
    return { lineas, exito: false, mensaje: `El stock máximo disponible es ${linea.stock}.` };
  }
  linea.cantidad = nuevaCantidad;
  return { lineas: guardarCarrito(lineas), exito: true };
}

export function eliminarItem(tipo, id) {
  return guardarCarrito(obtenerCarrito().filter((linea) => !(linea.tipo === tipo && String(linea.id) === String(id))));
}

export function vaciarCarrito() {
  return guardarCarrito([]);
}

export function calcularSubtotal(lineas = obtenerCarrito()) {
  return lineas.reduce((total, linea) => total + linea.precio * linea.cantidad, 0);
}

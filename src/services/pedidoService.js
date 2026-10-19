/**
 * PEDIDOS SIMULADOS · Conserva historial y copia del último pedido.
 * El número combina fecha y secuencia local. No representa una transacción
 * de pago. FinalizarCompra lo crea antes de vaciar el carrito.
 */
import { guardarSesion, leerSesion } from "./storageService";

const CLAVE_PEDIDOS = "tarot-react-pedidos";
const CLAVE_ULTIMO_PEDIDO = "tarot-react-ultimo-pedido";

export function crearPedido(datos) {
  const pedidos = leerSesion(CLAVE_PEDIDOS, []);
  const fecha = new Date();
  const fechaCompacta = fecha.toISOString().slice(0, 10).replaceAll("-", "");
  const pedido = {
    ...datos,
    numero: `TOA-${fechaCompacta}-${String(pedidos.length + 1).padStart(4, "0")}`,
    fecha: fecha.toISOString(),
  };
  guardarSesion(CLAVE_PEDIDOS, [...pedidos, pedido]);
  guardarSesion(CLAVE_ULTIMO_PEDIDO, pedido);
  return pedido;
}

export function obtenerUltimoPedido() {
  return leerSesion(CLAVE_ULTIMO_PEDIDO, null);
}

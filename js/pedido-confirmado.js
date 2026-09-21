const contenedorPedido = document.getElementById("pedidoConfirmado");
let pedido = null;

try {
  pedido = JSON.parse(localStorage.getItem("tarot-ultimo-pedido") || "null");
} catch (error) {
  pedido = null;
}

function obtenerMensajeEntrega(tipo) {
  if (tipo === "Digital") return "Tus experiencias digitales quedaron disponibles para continuar tu recorrido.";
  if (tipo === "Retiro") return "Tu pedido quedará preparado para retiro. Esta coordinación es solo demostrativa.";
  return "Tu pedido simula un despacho a la dirección ingresada. No se realizará un envío real.";
}

if (!pedido) {
  contenedorPedido.innerHTML = `<div class="alert alert-warning" role="alert">No encontramos un pedido reciente. <a class="alert-link" href="tienda.html">Ir a la tienda</a></div>`;
} else {
  const fecha = new Intl.DateTimeFormat("es-CL", { dateStyle: "long", timeStyle: "short" }).format(new Date(pedido.fecha));
  contenedorPedido.innerHTML = `
    <div class="confirmacion-pedido">
      <p class="tipo-experiencia">Pedido simulado confirmado</p>
      <h2>${pedido.numero}</h2>
      <p>${fecha}</p>
      <p class="mensaje-entrega">${obtenerMensajeEntrega(pedido.entrega.tipo)}</p>
      <ul class="lista-resumen-checkout">${pedido.lineas.map((linea) => `<li><span>${linea.nombre} × ${linea.cantidad}</span><strong>${window.CarritoTarot.formatearPrecio(linea.precio * linea.cantidad)}</strong></li>`).join("")}</ul>
      <dl><div><dt>Subtotal</dt><dd>${window.CarritoTarot.formatearPrecio(pedido.subtotal)}</dd></div><div><dt>Despacho</dt><dd>${window.CarritoTarot.formatearPrecio(pedido.despacho)}</dd></div><div class="fila-total"><dt>Total</dt><dd>${window.CarritoTarot.formatearPrecio(pedido.total)}</dd></div></dl>
      <div class="acciones-detalle"><md-filled-button data-href="tienda.html">Seguir explorando</md-filled-button><md-outlined-button data-href="index.html">Volver al inicio</md-outlined-button></div>
    </div>`;
}

/**
 * Mantiene sincronizado el badge del carrito en todas las páginas.
 *
 * El valor representa unidades (dos mazos = 2) y no cantidad de líneas.
 * Escucha el evento emitido por CarritoTarot para actualizarse sin recargar.
 */
function actualizarContadorCarrito() {
  const cantidad = window.CarritoTarot ? window.CarritoTarot.obtenerCantidadUnidades() : 0;
  document.querySelectorAll("[data-contador-carrito]").forEach((contador) => {
    contador.textContent = String(cantidad);
    contador.hidden = cantidad === 0;
    contador.setAttribute("aria-hidden", String(cantidad === 0));
  });

  document.querySelectorAll("[data-link-carrito]").forEach((enlace) => {
    enlace.classList.toggle("tiene-elementos", cantidad > 0);
    enlace.setAttribute(
      "aria-label",
      cantidad === 0 ? "Carrito vacío" : `Carrito, ${cantidad} ${cantidad === 1 ? "unidad" : "unidades"}`,
    );
  });
}

window.actualizarContadorCarrito = actualizarContadorCarrito;
window.addEventListener("carrito-actualizado", actualizarContadorCarrito);
window.addEventListener("storage", (evento) => {
  if (evento.key === "tarot-carrito") actualizarContadorCarrito();
});
actualizarContadorCarrito();

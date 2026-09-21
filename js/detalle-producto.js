/**
 * Detalle de un producto.
 *
 * El id viaja en la URL (detalle-producto.html?id=...). Así una sola página
 * sirve para los once productos y para los que se agreguen en el futuro.
 */
const contenedorProducto = document.getElementById("detalleProducto");
const productoId = new URLSearchParams(window.location.search).get("id");
const productoSeleccionado = productos.find((producto) => producto.id === productoId);

/** Muestra el resultado cerca del botón y también en el aviso temporal global. */
function mostrarMensajeProducto(tipo, mensaje) {
  const contenedor = document.getElementById("mensajeProductoDetalle");
  contenedor.innerHTML = `<div class="alert alert-${tipo === "error" ? "danger" : "success"} mt-3 mb-0" role="status">${mensaje}</div>`;
  window.InterfazRitual?.mostrarSnackbar(mensaje, tipo);
}

/**
 * Envía al servicio común solo los datos necesarios para reconstruir esta
 * línea del carrito. El servicio decide si crea la línea o aumenta cantidad.
 */
function agregarProducto() {
  const resultado = window.CarritoTarot.agregar({
    tipo: "producto",
    id: productoSeleccionado.id,
    nombre: productoSeleccionado.nombre,
    precio: productoSeleccionado.precio,
    cantidad: 1,
    imagen: productoSeleccionado.imagen,
    alt: productoSeleccionado.alt,
    stock: productoSeleccionado.stock,
  });
  mostrarMensajeProducto(resultado.exito ? "exito" : "error", resultado.mensaje);
}

if (!productoSeleccionado) {
  contenedorProducto.innerHTML = `<div class="alert alert-warning text-center" role="alert">El producto solicitado no fue encontrado. <a class="alert-link" href="tienda.html">Volver a la tienda</a></div>`;
} else {
  contenedorProducto.innerHTML = `
    <article class="detalle-producto">
      <div class="marco-producto marco-producto-detalle">
        <img src="${productoSeleccionado.imagen}" alt="${productoSeleccionado.alt}">
      </div>
      <div class="contenido-producto">
        <p class="tipo-experiencia">${productoSeleccionado.categoria}</p>
        <h2>${productoSeleccionado.nombre}</h2>
        <p>${productoSeleccionado.descripcion}</p>
        <p class="precio-producto">${window.CarritoTarot.formatearPrecio(productoSeleccionado.precio)}</p>
        <p class="stock-producto">Stock simulado: ${productoSeleccionado.stock} unidades.</p>
        <div class="acciones-detalle">
          <md-filled-button id="botonAgregarProducto">Agregar al carrito</md-filled-button>
          <md-outlined-button data-href="tienda.html">Volver a la tienda</md-outlined-button>
        </div>
        <div id="mensajeProductoDetalle" aria-live="polite"></div>
      </div>
    </article>
  `;
  document.getElementById("botonAgregarProducto").addEventListener("click", agregarProducto);
}

/**
 * Vista del carrito único.
 *
 * El servicio guarda la información; este archivo la separa visualmente en
 * Experiencias y Productos para que la persona entienda que ambos se compran
 * juntos, pero tienen naturalezas distintas.
 */
const contenedorCarrito = document.getElementById("contenidoCarrito");

/**
 * Crea una línea y deshabilita controles que producirían un estado inválido:
 * no se puede bajar de una unidad ni superar el stock de un producto.
 */
function crearLineaCarrito(linea) {
  const limite = linea.tipo === "producto" && linea.cantidad >= linea.stock;
  return `
    <article class="linea-carrito" data-tipo="${linea.tipo}" data-id="${linea.id}">
      <img src="${linea.imagen}" alt="${linea.alt}">
      <div class="informacion-linea">
        <p class="tipo-experiencia">${linea.tipo === "producto" ? "Producto" : "Experiencia"}</p>
        <h3>${linea.nombre}</h3>
        <p>${window.CarritoTarot.formatearPrecio(linea.precio)} por unidad</p>
        ${limite ? `<p class="aviso-stock" role="status">Llegaste al stock máximo de ${linea.stock}.</p>` : ""}
      </div>
      <div class="control-cantidad" aria-label="Cantidad de ${linea.nombre}">
        <button class="boton-cantidad" type="button" data-accion="restar" aria-label="Restar una unidad de ${linea.nombre}" title="Restar" ${linea.cantidad <= 1 ? "disabled" : ""}><span aria-hidden="true">−</span></button>
        <output aria-live="polite">${linea.cantidad}</output>
        <button class="boton-cantidad" type="button" data-accion="sumar" aria-label="Agregar una unidad de ${linea.nombre}" title="Agregar" ${limite ? "disabled" : ""}><span aria-hidden="true">+</span></button>
      </div>
      <strong class="total-linea">${window.CarritoTarot.formatearPrecio(linea.precio * linea.cantidad)}</strong>
      <button class="boton-quitar-linea" type="button" data-accion="quitar" aria-label="Quitar ${linea.nombre}" title="Quitar del carrito"><span aria-hidden="true">×</span></button>
    </article>
  `;
}

/** No crea encabezados vacíos cuando el carrito contiene solo un tipo de ítem. */
function crearGrupo(titulo, lineas) {
  if (lineas.length === 0) return "";
  return `<section class="grupo-carrito" aria-labelledby="grupo-${titulo.toLowerCase()}"><h2 id="grupo-${titulo.toLowerCase()}">${titulo}</h2>${lineas.map(crearLineaCarrito).join("")}</section>`;
}

/**
 * Renderiza desde localStorage cada vez que se modifica una línea. El despacho
 * no se suma todavía porque depende de Retiro o Despacho en el checkout.
 */
function mostrarCarrito() {
  const lineas = window.CarritoTarot.obtenerLineas();
  if (lineas.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="estado-vacio-carrito">
        <h2>Tu carrito está vacío</h2>
        <p>Aún no has agregado experiencias pagadas ni productos.</p>
        <div class="acciones-detalle">
          <md-filled-button data-href="experiencias.html">Explorar experiencias</md-filled-button>
          <md-outlined-button data-href="tienda.html">Visitar la tienda</md-outlined-button>
        </div>
      </div>`;
    return;
  }

  const experiencias = lineas.filter((linea) => linea.tipo === "experiencia");
  const productosCarrito = lineas.filter((linea) => linea.tipo === "producto");
  const subtotal = window.CarritoTarot.calcularSubtotal(lineas);
  const textoDespacho = productosCarrito.length > 0 ? "Se calcula al finalizar" : window.CarritoTarot.formatearPrecio(0);

  contenedorCarrito.innerHTML = `
    <div class="layout-carrito">
      <div>${crearGrupo("Experiencias", experiencias)}${crearGrupo("Productos", productosCarrito)}</div>
      <aside class="resumen-compra" aria-labelledby="tituloResumenCarrito">
        <p class="tipo-experiencia">Compra única</p>
        <h2 id="tituloResumenCarrito">Resumen</h2>
        <dl><div><dt>Subtotal</dt><dd>${window.CarritoTarot.formatearPrecio(subtotal)}</dd></div><div><dt>Despacho</dt><dd>${textoDespacho}</dd></div><div class="fila-total"><dt>Total provisorio</dt><dd>${window.CarritoTarot.formatearPrecio(subtotal)}</dd></div></dl>
        <md-filled-button data-href="finalizar-compra.html">Finalizar compra</md-filled-button>
      </aside>
    </div>`;
}

/**
 * Se usa delegación de eventos: aunque mostrarCarrito reemplace el HTML de las
 * líneas, el único escuchador sigue funcionando sobre el contenedor principal.
 */
contenedorCarrito.addEventListener("click", async (evento) => {
  const boton = evento.target.closest("[data-accion]");
  const lineaHtml = evento.target.closest(".linea-carrito");
  if (!boton || !lineaHtml) return;

  const { tipo, id } = lineaHtml.dataset;
  const linea = window.CarritoTarot.obtenerLineas().find(
    (elemento) => elemento.tipo === tipo && String(elemento.id) === id,
  );
  if (!linea) return;

  if (boton.dataset.accion === "quitar") {
    const confirmado = await window.InterfazRitual.confirmar({
      titulo: "Quitar del carrito",
      mensaje: `¿Deseas quitar ${linea.nombre} de la compra?`,
      textoConfirmar: "Quitar",
    });
    if (!confirmado) return;
    window.CarritoTarot.quitar(tipo, id);
    window.InterfazRitual.mostrarSnackbar(`${linea.nombre} fue retirado.`);
  } else {
    const variacion = boton.dataset.accion === "sumar" ? 1 : -1;
    const resultado = window.CarritoTarot.actualizarCantidad(tipo, id, linea.cantidad + variacion);
    window.InterfazRitual.mostrarSnackbar(resultado.mensaje, resultado.exito ? "exito" : "error");
  }
  mostrarCarrito();
});

mostrarCarrito();

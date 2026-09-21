/**
 * Catálogo de Tienda.
 *
 * Los productos viven en datos-productos.js y esta página solo decide cómo
 * mostrarlos. Separar datos y vista permite sumar otro oráculo o libro sin
 * crear nuevas tarjetas manualmente en el HTML.
 */
const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorFiltros = document.getElementById("filtrosTienda");
const mensajeResultados = document.getElementById("mensajeResultadosTienda");
const categorias = [...new Set(productos.map((producto) => producto.categoria))];

/** Crea un chip “Todos” y un chip por cada categoría realmente existente. */
function crearFiltros() {
  const opciones = ["Todos", ...categorias];
  contenedorFiltros.innerHTML = opciones
    .map(
      (categoria, indice) => `
        <md-filter-chip
          class="filtro-tienda"
          data-categoria="${categoria}"
          label="${categoria}"
          ${indice === 0 ? "selected" : ""}
        ></md-filter-chip>
      `,
    )
    .join("");

  contenedorFiltros.querySelectorAll("md-filter-chip").forEach((filtro) => {
    filtro.addEventListener("click", () => mostrarProductos(filtro.dataset.categoria));
  });
}

/** Transforma un objeto de datos en una tarjeta visual reutilizable. */
function crearTarjetaProducto(producto) {
  return `
    <div class="col-sm-6 col-xl-4">
      <article class="tarjeta-producto">
        <div class="marco-producto">
          <img src="${producto.imagen}" alt="${producto.alt}">
        </div>
        <div class="contenido-producto">
          <p class="tipo-experiencia">${producto.categoria}</p>
          <h2>${producto.nombre}</h2>
          <p>${producto.descripcion}</p>
          <div class="meta-producto">
            <strong>${window.CarritoTarot.formatearPrecio(producto.precio)}</strong>
            <span>${producto.stock} disponibles</span>
          </div>
          <md-filled-button data-href="detalle-producto.html?id=${producto.id}">Ver producto</md-filled-button>
        </div>
      </article>
    </div>
  `;
}

/**
 * Filtra el arreglo sin modificarlo y sincroniza el estado visual de los
 * chips. De este modo cambiar de categoría siempre puede volver a “Todos”.
 */
function mostrarProductos(categoria = "Todos") {
  const visibles = categoria === "Todos"
    ? productos
    : productos.filter((producto) => producto.categoria === categoria);

  contenedorFiltros.querySelectorAll("md-filter-chip").forEach((filtro) => {
    filtro.selected = filtro.dataset.categoria === categoria;
  });
  contenedorProductos.innerHTML = visibles.map(crearTarjetaProducto).join("");
  mensajeResultados.textContent = categoria === "Todos"
    ? `Mostrando los ${visibles.length} productos disponibles.`
    : `${visibles.length} productos en ${categoria}.`;
}

crearFiltros();
mostrarProductos();

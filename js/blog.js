/*
  Renderiza el listado público de artículos del blog
  a partir del arreglo articulosBlog definido en datos-blog.js.

  Mantiene la misma estructura visual que el HTML original:
  col-lg-6 + tarjeta-experiencia + img + contenido-tarjeta.

  Filtros (RN-S01 a RN-S04):
  - Búsqueda case-insensitive en título, extracto y etiquetas.
  - Filtro por categoría, excluyente.
  - Combinable búsqueda + filtro.
*/
const contenedorBlog = document.getElementById("contenedorBlog");
const inputBusquedaBlog = document.getElementById("busquedaBlog");
const botonesFiltroBlog = document.querySelectorAll("[data-filtro-blog]");
const mensajeFiltroBlog = document.getElementById("mensajeFiltroBlog");

let filtroCategoriaBlog = "todos";
let textoBusquedaBlog = "";

/**
 * Filtra artículos según categoría + texto de búsqueda.
 */
function filtrarArticulos() {
  const texto = textoBusquedaBlog.trim().toLowerCase();

  return articulosBlog.filter((articulo) => {
    if (articulo.estado !== "publicado") return false;

    const coincideCategoria =
      filtroCategoriaBlog === "todos" ||
      articulo.categoria === filtroCategoriaBlog;

    if (!coincideCategoria) return false;

    if (texto === "") return true;

    const enTitulo = articulo.titulo.toLowerCase().includes(texto);
    const enExtracto = articulo.extracto.toLowerCase().includes(texto);
    const enEtiquetas = articulo.etiquetas.some((etiqueta) =>
      etiqueta.toLowerCase().includes(texto),
    );

    return enTitulo || enExtracto || enEtiquetas;
  });
}

/**
 * Construye una tarjeta de blog con la misma estructura visual original.
 */
function crearTarjetaBlog(articulo) {
  return `
    <div class="col-lg-6">
      <article class="tarjeta-experiencia">
        <img
          src="${articulo.imagenPortada}"
          alt="${articulo.altImagen}"
        />

        <div class="contenido-tarjeta p-4">
          <p class="meta-blog">
            ${articulo.categoriaVisible} · ${articulo.tiempoLectura} min de lectura
          </p>

          <h2>${articulo.titulo}</h2>

          <p>${articulo.extracto}</p>

          <a
            class="btn btn-experiencia"
            href="blog-detalle.html?slug=${articulo.slug}"
          >
            Abrir publicación
          </a>
        </div>
      </article>
    </div>
  `;
}

/**
 * Mensaje informativo cuando no hay resultados (RN-S04).
 */
function mostrarSinResultados() {
  contenedorBlog.innerHTML = `
    <div class="col-12">
      <div class="alert alert-light text-center" role="alert">
        <h2 class="h5 mb-2">No encontramos publicaciones</h2>
        <p class="mb-0">
          Prueba con otra palabra o cambia el filtro de categoría.
        </p>
      </div>
    </div>
  `;
}

/**
 * Dibuja el listado en pantalla y actualiza el mensaje de estado.
 */
function renderizarBlog() {
  const articulos = filtrarArticulos();

  if (articulos.length === 0) {
    mostrarSinResultados();
  } else {
    contenedorBlog.innerHTML = articulos.map(crearTarjetaBlog).join("");
  }

  if (mensajeFiltroBlog) {
    if (filtroCategoriaBlog === "todos" && textoBusquedaBlog.trim() === "") {
      mensajeFiltroBlog.textContent = `Mostrando todas las publicaciones (${articulos.length}).`;
    } else {
      mensajeFiltroBlog.textContent = `Publicaciones encontradas: ${articulos.length}.`;
    }
  }

  botonesFiltroBlog.forEach((boton) => {
    const activo = boton.dataset.filtroBlog === filtroCategoriaBlog;
    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));
  });
}

/* Eventos */
if (inputBusquedaBlog) {
  inputBusquedaBlog.addEventListener("input", (evento) => {
    textoBusquedaBlog = evento.target.value;
    renderizarBlog();
  });
}

botonesFiltroBlog.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtroCategoriaBlog = boton.dataset.filtroBlog;
    renderizarBlog();
  });
});

/* Estado inicial */
renderizarBlog();

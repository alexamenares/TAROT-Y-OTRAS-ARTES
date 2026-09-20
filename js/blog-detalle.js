/*
  Muestra el detalle de un artículo del blog según ?slug= en la URL.
  Si el slug no existe, muestra un aviso y enlace de regreso.
*/
const contenedorDetalleBlog = document.getElementById("detalleBlog");

const parametrosBlog = new URLSearchParams(window.location.search);
const slugBlog = parametrosBlog.get("slug");

const articuloSeleccionado = articulosBlog.find(
  (articulo) => articulo.slug === slugBlog && articulo.estado === "publicado",
);

/**
 * Convierte el contenido estructurado del artículo a HTML.
 */
function renderizarContenidoArticulo(contenido) {
  return contenido
    .map((bloque) => {
      if (bloque.tipo === "subtitulo") {
        return `<h2>${bloque.texto}</h2>`;
      }
      if (bloque.tipo === "bloque-destacado") {
        return `<div class="bloque-destacado my-4">${bloque.texto}</div>`;
      }
      return `<p>${bloque.texto}</p>`;
    })
    .join("");
}

/**
 * Devuelve hasta 2 artículos relacionados (misma categoría, distinto slug).
 */
function obtenerRelacionados(articulo) {
  return articulosBlog
    .filter(
      (otro) =>
        otro.slug !== articulo.slug &&
        otro.categoria === articulo.categoria &&
        otro.estado === "publicado",
    )
    .slice(0, 2);
}

function mostrarArticuloNoEncontrado() {
  contenedorDetalleBlog.innerHTML = `
    <div class="alert alert-warning text-center" role="alert">
      La publicación solicitada no fue encontrada.
      <a href="blog.html" class="alert-link">Volver al blog</a>
    </div>
  `;
}

function mostrarDetalleBlog() {
  if (!articuloSeleccionado) {
    mostrarArticuloNoEncontrado();
    return;
  }

  document.title = `${articuloSeleccionado.titulo} | Tarot y Otras Artes`;

  const relacionados = obtenerRelacionados(articuloSeleccionado);

  const bloqueRelacionados =
    relacionados.length > 0
      ? `
        <section class="mt-5">
          <h2 class="mb-4">Artículos relacionados</h2>
          <div class="row g-4">
            ${relacionados
              .map(
                (rel) => `
              <div class="col-md-6">
                <article class="tarjeta-experiencia">
                  <img src="${rel.imagenPortada}" alt="${rel.altImagen}" />
                  <div class="contenido-tarjeta p-4">
                    <p class="meta-blog">${rel.categoriaVisible}</p>
                    <h3>${rel.titulo}</h3>
                    <p>${rel.extracto}</p>
                    <a class="btn btn-experiencia" href="blog-detalle.html?slug=${rel.slug}">
                      Abrir publicación
                    </a>
                  </div>
                </article>
              </div>
            `,
              )
              .join("")}
          </div>
        </section>
      `
      : "";

  contenedorDetalleBlog.innerHTML = `
    <article class="tarjeta-experiencia contenido-articulo">
      <div class="contenido-tarjeta p-4 p-md-5">
        <img
          class="imagen-detalle-blog mb-4"
          src="${articuloSeleccionado.imagenPortada}"
          alt="${articuloSeleccionado.altImagen}"
        />

        <p class="meta-blog">
          Publicado por ${articuloSeleccionado.autor.nombre} ·
          ${articuloSeleccionado.tiempoLectura} min de lectura
        </p>

        ${renderizarContenidoArticulo(articuloSeleccionado.contenido)}

        <div class="acciones-articulo">
          <a class="btn btn-outline-secondary" href="blog.html">
            Volver al blog
          </a>

          <a
            class="btn btn-experiencia accion-principal-articulo"
            href="biblioteca.html"
          >
            Ir a biblioteca
          </a>
        </div>
      </div>
    </article>

    ${bloqueRelacionados}
  `;
}

mostrarDetalleBlog();

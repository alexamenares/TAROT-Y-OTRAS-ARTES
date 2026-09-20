/*
  Renderiza la biblioteca pública a partir del arreglo recursosBiblioteca
  definido en datos-biblioteca.js.

  Mantiene la misma estructura visual que el HTML original:
  col-md-6 col-lg-4 + tarjeta-experiencia + marco-imagen-recurso + contenido-tarjeta.

  Filtros (RN-L02): aprendizaje, guia, historia, ejercicio.
*/
const contenedorBiblioteca = document.getElementById("contenedorBiblioteca");
const botonesFiltroBiblioteca = document.querySelectorAll(
  "[data-filtro-biblioteca]",
);
const mensajeFiltroBiblioteca = document.getElementById("mensajeFiltroBiblioteca");

let filtroCategoriaBiblioteca = "todos";

/**
 * Carga una carta única por recurso.
 * Si el archivo no existe, deja el marcador visual de la tarjeta.
 */
function cargarImagenRecurso(contenedor, rutaImagen, textoAlternativo) {
  const imagen = new Image();

  imagen.addEventListener("load", () => {
    imagen.alt = textoAlternativo;
    imagen.src = rutaImagen;
    contenedor.appendChild(imagen);
    contenedor.classList.add("con-imagen");
  });

  imagen.addEventListener("error", () => {
    contenedor.classList.add("sin-imagen-real");
  });

  imagen.src = rutaImagen;
}

/**
 * Construye la tarjeta de un recurso con la misma estructura original.
 */
function crearTarjetaBiblioteca(recurso) {
  return `
    <div class="col-md-6 col-lg-4" data-categoria-recurso="${recurso.categoria}">
      <article class="tarjeta-experiencia">
        <div class="marco-imagen-recurso" data-ruta-imagen="${recurso.imagen}" data-alt-imagen="${recurso.altImagen}">
          <div class="marcador-recurso">Carta pendiente</div>
        </div>

        <div class="contenido-tarjeta">
          <p class="tipo-experiencia">${recurso.categoriaVisible}</p>
          <h2>${recurso.titulo}</h2>
          <p>${recurso.descripcion}</p>
          <p><strong>Nivel:</strong> ${recurso.nivelVisible}</p>
          <p><strong>Duración:</strong> ${recurso.duracion}</p>

          <a
            class="btn btn-experiencia"
            href="biblioteca-detalle.html?slug=${recurso.slug}"
          >
            Ver recurso
          </a>
        </div>
      </article>
    </div>
  `;
}

/**
 * Aplica filtro, renderiza y luego intenta cargar las imágenes.
 */
function renderizarBiblioteca() {
  const recursos = recursosBiblioteca.filter((recurso) => {
    return (
      filtroCategoriaBiblioteca === "todos" ||
      recurso.categoria === filtroCategoriaBiblioteca
    );
  });

  if (recursos.length === 0) {
    contenedorBiblioteca.innerHTML = `
      <div class="col-12">
        <div class="alert alert-light text-center" role="alert">
          No hay recursos en esta categoría por ahora.
        </div>
      </div>
    `;
  } else {
    contenedorBiblioteca.innerHTML = recursos.map(crearTarjetaBiblioteca).join("");

    /* Cargamos las imágenes una vez insertadas en el DOM. */
    document
      .querySelectorAll("[data-ruta-imagen]")
      .forEach((marco) => {
        cargarImagenRecurso(
          marco,
          marco.dataset.rutaImagen,
          marco.dataset.altImagen,
        );
      });
  }

  if (mensajeFiltroBiblioteca) {
    if (filtroCategoriaBiblioteca === "todos") {
      mensajeFiltroBiblioteca.textContent = `Mostrando todos los recursos disponibles (${recursos.length}).`;
    } else {
      mensajeFiltroBiblioteca.textContent = `Mostrando recursos de ${filtroCategoriaBiblioteca} (${recursos.length}).`;
    }
  }

  botonesFiltroBiblioteca.forEach((boton) => {
    const activo = boton.dataset.filtroBiblioteca === filtroCategoriaBiblioteca;
    boton.classList.toggle("activo", activo);
    boton.setAttribute("aria-pressed", String(activo));
  });
}

/* Eventos */
botonesFiltroBiblioteca.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtroCategoriaBiblioteca = boton.dataset.filtroBiblioteca;
    renderizarBiblioteca();
  });
});

/* Estado inicial */
renderizarBiblioteca();

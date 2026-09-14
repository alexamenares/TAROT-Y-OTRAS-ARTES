/**
 * Filtros simples para la biblioteca pública.
 * No consultan backend: solo muestran u ocultan tarjetas ya escritas en HTML.
 */
const botonesFiltroBiblioteca = document.querySelectorAll(
  "[data-filtro-biblioteca]",
);
const recursosBiblioteca = document.querySelectorAll("[data-categoria-recurso]");
const mensajeFiltroBiblioteca = document.getElementById(
  "mensajeFiltroBiblioteca",
);
const contenedoresImagenBiblioteca = document.querySelectorAll(
  "[data-imagen-biblioteca]",
);

/**
 * Carga una carta única para cada recurso.
 * Si el archivo aún no existe, conserva el marcador visual de la tarjeta.
 */
function cargarImagenBiblioteca(contenedor) {
  const rutaImagen = contenedor.dataset.imagenBiblioteca;
  const textoAlternativo = contenedor.dataset.altBiblioteca;
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
 * Devuelve un texto claro para informar el filtro activo.
 */
function obtenerMensajeFiltro(filtro, cantidadVisible) {
  if (filtro === "todos") {
    return `Mostrando todos los recursos disponibles (${cantidadVisible}).`;
  }

  return `Mostrando recursos de ${filtro} (${cantidadVisible}).`;
}

/**
 * Aplica el filtro seleccionado y actualiza el estado visual de los botones.
 */
function filtrarBiblioteca(filtroSeleccionado) {
  let cantidadVisible = 0;

  recursosBiblioteca.forEach((recurso) => {
    const coincideCategoria =
      filtroSeleccionado === "todos" ||
      recurso.dataset.categoriaRecurso === filtroSeleccionado;

    recurso.classList.toggle("d-none", !coincideCategoria);

    if (coincideCategoria) {
      cantidadVisible += 1;
    }
  });

  botonesFiltroBiblioteca.forEach((boton) => {
    const esBotonActivo =
      boton.dataset.filtroBiblioteca === filtroSeleccionado;

    boton.classList.toggle("activo", esBotonActivo);
    boton.setAttribute("aria-pressed", String(esBotonActivo));
  });

  mensajeFiltroBiblioteca.textContent = obtenerMensajeFiltro(
    filtroSeleccionado,
    cantidadVisible,
  );
}

botonesFiltroBiblioteca.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtrarBiblioteca(boton.dataset.filtroBiblioteca);
  });
});

contenedoresImagenBiblioteca.forEach(cargarImagenBiblioteca);

/* Dejamos el estado inicial declarado también para lectores de pantalla. */
filtrarBiblioteca("todos");

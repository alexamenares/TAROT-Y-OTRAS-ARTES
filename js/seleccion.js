/**
 * Contenedor vacío creado en mi-seleccion.html.
 * Aquí se mostrarán las experiencias guardadas por el usuario.
 */
const contenedorSeleccion = document.getElementById("contenedorSeleccion");

/**
 * Obtiene la selección almacenada en el navegador.
 * Si no existe información guardada, devuelve un arreglo vacío.
 */
function obtenerSeleccionGuardada() {
  const seleccionGuardada = localStorage.getItem("seleccionExperiencias");

  if (seleccionGuardada === null) {
    return [];
  }

  return JSON.parse(seleccionGuardada);
}

/**
 * Recibe un precio numérico y devuelve un texto para mostrar al usuario.
 */
function obtenerTextoPrecioSeleccion(precio) {
  if (precio === 0) {
    return "Gratuita";
  }

  return `Precio referencial: $${precio.toLocaleString("es-CL")}`;
}

/**
 * Calcula la suma de los precios referenciales de la selección.
 * Las experiencias gratuitas aportan el valor 0 al total.
 */
function calcularTotalReferencial(seleccion) {
  return seleccion.reduce(
    (total, experiencia) => total + experiencia.precio,
    0,
  );
}

/**
 * Muestra un mensaje cuando el usuario todavía no ha agregado experiencias.
 */
function mostrarSeleccionVacia() {
  contenedorSeleccion.innerHTML = `
    <div class="alert alert-light text-center" role="alert">
      <h2 class="h4">Tu selección está vacía</h2>

      <p>
        Explora las experiencias disponibles y agrega las que más conecten
        contigo.
      </p>

      <a class="btn btn-experiencia" href="experiencias.html">
        Explorar experiencias
      </a>
    </div>
  `;
}

/**
 * Crea el HTML correspondiente a una experiencia guardada.
 * data-id permite identificar cuál experiencia se debe quitar al hacer clic.
 */
function crearTarjetaSeleccion(experiencia) {
  return `
    <article class="tarjeta-experiencia mb-4">
      <div class="row g-0">
        <div class="col-md-2">
          <img
            class="imagen-seleccion"
            src="${experiencia.imagen}"
            alt="${experiencia.textoAlternativo}"
          >
        </div>

        <div class="col-md-10">
          <div class="contenido-tarjeta p-4">
            <p class="tipo-experiencia">${experiencia.categoria}</p>

            <h2>${experiencia.nombre}</h2>

            <p>${experiencia.descripcion}</p>

            <p class="precio-experiencia">
              ${obtenerTextoPrecioSeleccion(experiencia.precio)}
            </p>

            <button
              class="btn btn-outline-danger boton-eliminar"
              data-id="${experiencia.id}"
              type="button"
            >
              Quitar de mi selección
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Elimina una experiencia según su identificador y actualiza localStorage.
 */
function quitarExperienciaDeSeleccion(experienciaId) {
  const seleccionActual = obtenerSeleccionGuardada();

  const seleccionActualizada = seleccionActual.filter(
    (experiencia) => experiencia.id !== experienciaId,
  );

  localStorage.setItem(
    "seleccionExperiencias",
    JSON.stringify(seleccionActualizada),
  );

  if (typeof window.actualizarContadorSeleccion === "function") {
    window.actualizarContadorSeleccion();
  }

  /* Volvemos a dibujar la página con la selección actualizada. */
  mostrarSeleccion();
}

/**
 * Conecta cada botón "Quitar" con la función de eliminación correspondiente.
 */
function configurarBotonesEliminar() {
  const botonesEliminar = document.querySelectorAll(".boton-eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const experienciaId = Number(boton.dataset.id);

      quitarExperienciaDeSeleccion(experienciaId);
    });
  });
}

/**
 * Muestra la selección completa o el mensaje vacío, según corresponda.
 */
function mostrarSeleccion() {
  const seleccionActual = obtenerSeleccionGuardada();

  if (seleccionActual.length === 0) {
    mostrarSeleccionVacia();
    return;
  }

  const totalReferencial = calcularTotalReferencial(seleccionActual);

  contenedorSeleccion.innerHTML = `
    <div class="mb-4">
      <p class="tipo-experiencia">
        EXPERIENCIAS SELECCIONADAS: ${seleccionActual.length}
      </p>

      <!-- text-dark asegura contraste sobre el fondo claro. -->
      <h2 class="text-dark">Tu recorrido elegido</h2>

      <p class="text-dark">
        Total referencial:
        <strong>$${totalReferencial.toLocaleString("es-CL")}</strong>
      </p>
    </div>

    ${seleccionActual.map(crearTarjetaSeleccion).join("")}
  `;

  configurarBotonesEliminar();
}

/* Ejecutamos la función al abrir la página. */
mostrarSeleccion();

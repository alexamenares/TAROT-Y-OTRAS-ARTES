/**
 * Mi selección — selección de experiencias con control de cantidad.
 *
 * Estructura guardada en localStorage (clave: "seleccionExperiencias"):
 * [
 *   { id, categoria, nombre, descripcion, precio, imagen,
 *     textoAlternativo, cantidad }
 * ]
 *
 * Reglas del selección:
 * - Cada experiencia se agrega con cantidad inicial 1.
 * - La cantidad no puede bajar de 1 (para quitar, se usa "Quitar").
 * - La cantidad no puede superar 10 (regla de negocio razonable).
 * - El total referencial = suma de (precio × cantidad).
 * - El contador del menú muestra la suma total de cantidades.
 */
const contenedorSeleccion = document.getElementById("contenedorSeleccion");

/**
 * Obtiene la selección guardada y normaliza los ítems antiguos
 * (los que no tenían campo cantidad) para evitar errores.
 */
function obtenerSeleccionGuardada() {
  const seleccionGuardada = localStorage.getItem("seleccionExperiencias");

  if (seleccionGuardada === null) {
    return [];
  }

  let seleccion;
  try {
    seleccion = JSON.parse(seleccionGuardada);
  } catch (error) {
    return [];
  }

  if (!Array.isArray(seleccion)) {
    return [];
  }

  return seleccion.map((experiencia) => ({
    ...experiencia,
    cantidad:
      typeof experiencia.cantidad === "number" && experiencia.cantidad > 0
        ? experiencia.cantidad
        : 1,
  }));
}

/**
 * Guarda la selección actualizada en localStorage.
 */
function guardarSeleccion(seleccion) {
  localStorage.setItem("seleccionExperiencias", JSON.stringify(seleccion));
}

/**
 * Recibe un precio numérico y devuelve un texto comprensible.
 */
function obtenerTextoPrecioSeleccion(precio) {
  if (precio === 0) {
    return "Gratuita";
  }

  return `$${precio.toLocaleString("es-CL")}`;
}

/**
 * Calcula el total referencial sumando precio × cantidad.
 */
function calcularTotalReferencial(seleccion) {
  return seleccion.reduce(
    (total, experiencia) => total + experiencia.precio * experiencia.cantidad,
    0,
  );
}

/**
 * Calcula el subtotal de una línea (precio × cantidad).
 */
function calcularSubtotal(experiencia) {
  return experiencia.precio * experiencia.cantidad;
}

/**
 * Cuenta cuántos ítems totales hay (suma de cantidades).
 */
function contarItemsTotales(seleccion) {
  return seleccion.reduce(
    (total, experiencia) => total + experiencia.cantidad,
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
 * Genera el HTML de una línea del selección con control +/-.
 * El precio unitario y el subtotal se muestran separados.
 */
function crearTarjetaSeleccion(experiencia) {
  const esGratuita = experiencia.precio === 0;
  const subtotal = calcularSubtotal(experiencia);

  return `
    <article class="tarjeta-experiencia mb-4" data-id="${experiencia.id}">
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

            <p class="precio-experiencia mb-2">
              Precio unitario: ${obtenerTextoPrecioSeleccion(experiencia.precio)}
            </p>

            <div class="d-flex flex-wrap align-items-center gap-3 mt-3 mb-3">
              <!-- Control de cantidad -->
              <div class="control-cantidad" role="group" aria-label="Cantidad">
                <button
                  class="boton-cantidad boton-restar"
                  type="button"
                  data-accion="restar"
                  data-id="${experiencia.id}"
                  aria-label="Disminuir cantidad"
                  ${experiencia.cantidad <= 1 ? "disabled" : ""}
                >
                  −
                </button>

                <span
                  class="valor-cantidad"
                  aria-live="polite"
                  data-cantidad-id="${experiencia.id}"
                >
                  ${experiencia.cantidad}
                </span>

                <button
                  class="boton-cantidad boton-sumar"
                  type="button"
                  data-accion="sumar"
                  data-id="${experiencia.id}"
                  aria-label="Aumentar cantidad"
                  ${experiencia.cantidad >= 10 ? "disabled" : ""}
                >
                  +
                </button>
              </div>

              <p class="mb-0 subtotal-linea">
                Subtotal:
                <strong>${esGratuita ? "Gratuita" : `$${subtotal.toLocaleString("es-CL")}`}</strong>
              </p>
            </div>

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
 * Actualiza la cantidad de una experiencia y vuelve a dibujar.
 * delta puede ser +1 o -1.
 */
function cambiarCantidad(experienciaId, delta) {
  const seleccionActual = obtenerSeleccionGuardada();

  const experiencia = seleccionActual.find((item) => item.id === experienciaId);

  if (!experiencia) return;

  const nuevaCantidad = experiencia.cantidad + delta;

  /* Límites del selección: mínimo 1, máximo 10. */
  if (nuevaCantidad < 1 || nuevaCantidad > 10) return;

  experiencia.cantidad = nuevaCantidad;

  guardarSeleccion(seleccionActual);

  if (typeof window.actualizarContadorSeleccion === "function") {
    window.actualizarContadorSeleccion();
  }

  mostrarSeleccion();
}

/**
 * Elimina una experiencia según su identificador.
 */
function quitarExperienciaDeSeleccion(experienciaId) {
  const seleccionActual = obtenerSeleccionGuardada();

  const seleccionActualizada = seleccionActual.filter(
    (experiencia) => experiencia.id !== experienciaId,
  );

  guardarSeleccion(seleccionActualizada);

  if (typeof window.actualizarContadorSeleccion === "function") {
    window.actualizarContadorSeleccion();
  }

  mostrarSeleccion();
}

/**
 * Conecta los botones +/- y quitar después de renderizar.
 */
function configurarBotonesSeleccion() {
  document
    .querySelectorAll(".boton-cantidad")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        const id = Number(boton.dataset.id);
        const accion = boton.dataset.accion;

        cambiarCantidad(id, accion === "sumar" ? 1 : -1);
      });
    });

  document
    .querySelectorAll(".boton-eliminar")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        const id = Number(boton.dataset.id);
        quitarExperienciaDeSeleccion(id);
      });
    });
}

/**
 * Simula la confirmación de la selección (sin backend en esta etapa).
 */
function configurarBotonConfirmar() {
  const botonConfirmar = document.getElementById("botonConfirmarSeleccion");
  const mensajeConfirmar = document.getElementById("mensajeConfirmarSeleccion");

  if (!botonConfirmar || !mensajeConfirmar) return;

  botonConfirmar.addEventListener("click", () => {
    mensajeConfirmar.innerHTML = `
      <div class="alert alert-success mb-0" role="alert">
        Selección confirmada en modo simulado. El backend se integrará en
        una etapa posterior.
      </div>
    `;
  });
}

/**
 * Renderiza el selección completo o el estado vacío.
 */
function mostrarSeleccion() {
  const seleccionActual = obtenerSeleccionGuardada();

  if (seleccionActual.length === 0) {
    mostrarSeleccionVacia();
    return;
  }

  const totalReferencial = calcularTotalReferencial(seleccionActual);
  const itemsTotales = contarItemsTotales(seleccionActual);

  contenedorSeleccion.innerHTML = `
    <div class="mb-4">
      <p class="tipo-experiencia">
        EXPERIENCIAS SELECCIONADAS: ${itemsTotales}
      </p>

      <h2 class="text-dark">Tu recorrido elegido</h2>
    </div>

    ${seleccionActual.map(crearTarjetaSeleccion).join("")}

    <div class="resumen-selección">
      <p class="total-selección mb-3">
        TOTAL REFERENCIAL:
        <strong>$${totalReferencial.toLocaleString("es-CL")}</strong>
      </p>

      <div class="d-flex flex-wrap gap-3 justify-content-end">
        <a class="btn btn-outline-secondary" href="experiencias.html">
          Seguir explorando
        </a>

        <button
          class="btn btn-experiencia"
          id="botonConfirmarSeleccion"
          type="button"
        >
          Confirmar selección
        </button>
      </div>

      <div
        id="mensajeConfirmarSeleccion"
        class="mt-3"
        role="status"
        aria-live="polite"
      ></div>
    </div>
  `;

  configurarBotonesSeleccion();
  configurarBotonConfirmar();
}

/* Ejecutamos al cargar la página. */
mostrarSeleccion();

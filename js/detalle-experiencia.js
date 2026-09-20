/**
 * Obtenemos el contenedor vacío de detalle-experiencia.html.
 * Aquí mostraremos los datos de la experiencia seleccionada.
 */
const contenedorDetalle = document.getElementById("detalleExperiencia");

/**
 * URLSearchParams permite leer información escrita en la dirección web.
 * Por ejemplo, en detalle-experiencia.html?id=1 obtenemos el valor 1.
 */
const parametrosUrl = new URLSearchParams(window.location.search);

/* Convertimos el texto recibido desde la URL en un número. */
const experienciaId = Number(parametrosUrl.get("id"));

/**
 * find busca la primera experiencia cuyo id coincida con el id recibido.
 * El arreglo experiencias es proporcionado por datos-experiencias.js.
 */
const experienciaSeleccionada = experiencias.find(
  (experiencia) => experiencia.id === experienciaId,
);

/**
 * Recibe un precio numérico y devuelve un texto comprensible para el usuario.
 */
function obtenerTextoPrecioDetalle(precio) {
  if (precio === 0) {
    return "Esta experiencia es gratuita.";
  }

  return `Precio referencial: $${precio.toLocaleString("es-CL")}`;
}

/**
 * Obtiene las experiencias guardadas en el navegador.
 * Si aún no existe una selección, devuelve un arreglo vacío.
 * Normaliza ítems antiguos sin campo cantidad para evitar errores.
 */
function obtenerSeleccionGuardada() {
  let seleccionGuardada = null;

  try {
    seleccionGuardada = localStorage.getItem("seleccionExperiencias");
  } catch (error) {
    return [];
  }

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

  /* Normaliza ítems antiguos sin campo cantidad. */
  return seleccion.map((experiencia) => ({
    ...experiencia,
    cantidad:
      typeof experiencia.cantidad === "number" && experiencia.cantidad > 0
        ? experiencia.cantidad
        : 1,
  }));
}

/**
 * Muestra mensajes de confirmación o aviso sin bloquear la navegación.
 */
function mostrarMensajeSeleccion(tipo, mensaje) {
  const contenedorMensaje = document.getElementById("mensajeSeleccionDetalle");

  if (!contenedorMensaje) {
    return;
  }

  contenedorMensaje.innerHTML = `
    <div class="alert alert-${tipo} mt-3 mb-0" role="alert">
      ${mensaje}
    </div>
  `;
}

/**
 * Guarda la experiencia actual dentro de la selección del usuario.
 * Si ya existe, aumenta su cantidad (hasta el límite del selección).
 */
function agregarExperienciaASeleccion() {
  const seleccionActual = obtenerSeleccionGuardada();

  const experienciaExistente = seleccionActual.find(
    (experiencia) => experiencia.id === experienciaSeleccionada.id,
  );

  if (experienciaExistente) {
    /* Ya estaba en la selección: subimos la cantidad si no llegó al tope. */
    if (experienciaExistente.cantidad >= 10) {
      mostrarMensajeSeleccion(
        "warning",
        "Ya alcanzaste el máximo de 10 unidades para esta experiencia.",
      );
      return;
    }

    experienciaExistente.cantidad += 1;
  } else {
    /* Primera vez: agregamos con cantidad 1. */
    seleccionActual.push({
      ...experienciaSeleccionada,
      cantidad: 1,
    });
  }

  /*
   * localStorage solo puede guardar texto.
   * JSON.stringify transforma el arreglo de JavaScript en texto almacenable.
   */
  try {
    localStorage.setItem(
      "seleccionExperiencias",
      JSON.stringify(seleccionActual),
    );
  } catch (error) {
    mostrarMensajeSeleccion(
      "danger",
      "No fue posible guardar la experiencia en este navegador.",
    );
    return;
  }

  if (typeof window.actualizarContadorSeleccion === "function") {
    window.actualizarContadorSeleccion();
  }

  mostrarMensajeSeleccion(
    "success",
    experienciaExistente
      ? "Se aumentó la cantidad en tu selección."
      : "La experiencia fue agregada a tu selección.",
  );
}

/**
 * Muestra un aviso si se intenta entrar con un identificador inexistente.
 * Esto evita que la página quede vacía ante una dirección incorrecta.
 */
function mostrarExperienciaNoEncontrada() {
  contenedorDetalle.innerHTML = `
    <div class="alert alert-warning text-center" role="alert">
      La experiencia solicitada no fue encontrada.
      <a href="experiencias.html" class="alert-link">
        Volver al catálogo
      </a>
    </div>
  `;
}

/**
 * Construye visualmente el detalle de la experiencia seleccionada.
 */
function mostrarDetalleExperiencia() {
  if (!experienciaSeleccionada) {
    mostrarExperienciaNoEncontrada();
    return;
  }

  contenedorDetalle.innerHTML = `
    <article class="tarjeta-experiencia">
      <div class="row g-0">
        <div class="col-md-5">
          <img
            class="w-100 h-100 object-fit-cover"
            src="${experienciaSeleccionada.imagen}"
            alt="${experienciaSeleccionada.textoAlternativo}"
          >
        </div>

        <div class="col-md-7">
          <div class="contenido-tarjeta p-4">
            <p class="tipo-experiencia">
              ${experienciaSeleccionada.categoria}
            </p>

            <h2>${experienciaSeleccionada.nombre}</h2>

            <p>${experienciaSeleccionada.descripcion}</p>

            <p class="precio-experiencia">
              ${obtenerTextoPrecioDetalle(experienciaSeleccionada.precio)}
            </p>

            <!-- Este botón guardará la experiencia en localStorage. -->
            <button
              class="btn btn-experiencia"
              id="botonAgregarSeleccion"
              type="button"
            >
              Agregar a mi selección
            </button>

            <a
              class="btn btn-outline-secondary ms-2"
              href="experiencias.html"
            >
              Regresar a experiencias
            </a>

            <div
              id="mensajeSeleccionDetalle"
              role="status"
              aria-live="polite"
            ></div>
          </div>
        </div>
      </div>
    </article>
  `;

  /*
   * El botón existe recién después de insertar el HTML anterior.
   * Por eso configuramos su clic al final de esta función.
   */
  const botonAgregarSeleccion = document.getElementById(
    "botonAgregarSeleccion",
  );

  botonAgregarSeleccion.addEventListener("click", agregarExperienciaASeleccion);
}

/* Ejecutamos la función al cargar la página de detalle. */
mostrarDetalleExperiencia();

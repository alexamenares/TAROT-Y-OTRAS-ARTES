/**
 * Buscamos el contenedor vacío creado en experiencias.html.
 * Ahí insertaremos las tarjetas generadas con JavaScript.
 */
const contenedorExperiencias = document.getElementById(
  "contenedorExperiencias",
);

/**
 * Recibe un precio numérico y devuelve un texto para mostrar al usuario.
 * Si el precio es 0, la experiencia se muestra como gratuita.
 */
function obtenerTextoPrecio(precio) {
  if (precio === 0) {
    return "Gratuita";
  }

  return `Precio referencial: $${precio.toLocaleString("es-CL")}`;
}

/**
 * Recibe una experiencia y construye el HTML de una tarjeta.
 * Las comillas invertidas (`) permiten escribir HTML en varias líneas.
 */
function crearTarjetaExperiencia(experiencia) {
  return `
    <div class="col-md-4">
      <article class="tarjeta-experiencia">
        <img
          src="${experiencia.imagen}"
          alt="${experiencia.textoAlternativo}"
        >

        <div class="contenido-tarjeta">
          <p class="tipo-experiencia">${experiencia.categoria}</p>
          <h2>${experiencia.nombre}</h2>
          <p>${experiencia.descripcion}</p>

          <p class="precio-experiencia">
            ${obtenerTextoPrecio(experiencia.precio)}
          </p>

          <!-- El identificador permite mostrar el detalle correcto después. -->
          <a
            class="btn btn-experiencia"
            href="detalle-experiencia.html?id=${experiencia.id}"
          >
            Conocer experiencia
          </a>
        </div>
      </article>
    </div>
  `;
}

/**
 * map recorre el arreglo experiencias y crea una tarjeta por cada elemento.
 * join une todas las tarjetas en un solo texto HTML.
 */
function mostrarExperiencias() {
  contenedorExperiencias.innerHTML = experiencias
    .map(crearTarjetaExperiencia)
    .join("");
}

/* Ejecutamos la función para mostrar el catálogo al abrir la página. */
mostrarExperiencias();

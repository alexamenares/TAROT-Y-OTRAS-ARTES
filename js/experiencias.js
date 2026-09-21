/**
 * Catálogo de experiencias.
 *
 * Este archivo no guarda experiencias ni precios: solo recorre el arreglo
 * global de datos y genera enlaces hacia la página de detalle correspondiente.
 */
const contenedorExperiencias = document.getElementById("contenedorExperiencias");

function obtenerTextoPrecio(precio) {
  return precio === 0 ? "Gratuita" : window.CarritoTarot.formatearPrecio(precio);
}

/**
 * Crea una tarjeta semántica y usa un componente Material real para la acción.
 * El enlace por id evita duplicar una página HTML para cada experiencia.
 */
function crearTarjetaExperiencia(experiencia) {
  return `
    <div class="col-md-4">
      <article class="tarjeta-experiencia">
        <img src="${experiencia.imagen}" alt="${experiencia.textoAlternativo}">
        <div class="contenido-tarjeta">
          <p class="tipo-experiencia">${experiencia.categoria}</p>
          <h2>${experiencia.nombre}</h2>
          <p>${experiencia.descripcion}</p>
          <p class="precio-experiencia">${obtenerTextoPrecio(experiencia.precio)}</p>
          <md-filled-button class="accion-material" data-href="detalle-experiencia.html?id=${experiencia.id}">
            Conocer experiencia
          </md-filled-button>
        </div>
      </article>
    </div>
  `;
}

contenedorExperiencias.innerHTML = experiencias.map(crearTarjetaExperiencia).join("");

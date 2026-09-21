/**
 * Detalle de una experiencia.
 *
 * Comparte el mismo patrón de URL por id que los productos, pero distingue la
 * experiencia gratuita de las pagadas para evitar que “Una carta” aparezca en
 * el carrito.
 */
const contenedorDetalle = document.getElementById("detalleExperiencia");
const experienciaId = Number(new URLSearchParams(window.location.search).get("id"));
const experienciaSeleccionada = experiencias.find((experiencia) => experiencia.id === experienciaId);

/** Entrega retroalimentación persistente y temporal sin recargar la página. */
function mostrarMensajeExperiencia(tipo, mensaje) {
  const contenedor = document.getElementById("mensajeExperienciaDetalle");
  if (window.InterfazRitual) window.InterfazRitual.mostrarSnackbar(mensaje, tipo);
  if (contenedor) {
    contenedor.innerHTML = `<div class="alert alert-${tipo === "error" ? "danger" : "success"} mt-3 mb-0" role="status">${mensaje}</div>`;
  }
}

/** La experiencia gratuita comienza en pantalla y nunca altera el carrito. */
function iniciarExperienciaGratuita() {
  const espacio = document.getElementById("experienciaIniciada");
  espacio.hidden = false;
  espacio.innerHTML = `
    <p class="tipo-experiencia">Tu experiencia ha comenzado</p>
    <h3>Haz una pausa y observa la carta</h3>
    <p>Respira con calma. ¿Qué detalle llama primero tu atención y qué pregunta aparece al mirarlo?</p>
  `;
  espacio.focus();
  mostrarMensajeExperiencia("exito", "Iniciaste Una carta. No se agregó nada al carrito.");
}

/** Las experiencias pagadas usan el mismo servicio y carrito que los productos. */
function agregarExperienciaPagada() {
  const resultado = window.CarritoTarot.agregar({
    tipo: "experiencia",
    id: experienciaSeleccionada.id,
    nombre: experienciaSeleccionada.nombre,
    precio: experienciaSeleccionada.precio,
    cantidad: 1,
    imagen: experienciaSeleccionada.imagen,
    alt: experienciaSeleccionada.textoAlternativo,
    stock: null,
  });
  mostrarMensajeExperiencia(resultado.exito ? "exito" : "error", resultado.mensaje);
}

/** Decide qué acción corresponde según el precio declarado en los datos. */
function mostrarDetalleExperiencia() {
  if (!experienciaSeleccionada) {
    contenedorDetalle.innerHTML = `<div class="alert alert-warning text-center" role="alert">La experiencia solicitada no fue encontrada. <a href="experiencias.html" class="alert-link">Volver al catálogo</a></div>`;
    return;
  }

  const esGratuita = experienciaSeleccionada.precio === 0;
  const textoPrecio = esGratuita
    ? "Esta experiencia es gratuita."
    : window.CarritoTarot.formatearPrecio(experienciaSeleccionada.precio);

  contenedorDetalle.innerHTML = `
    <article class="tarjeta-experiencia detalle-catalogo">
      <div class="row g-0">
        <div class="col-md-5"><img class="w-100 h-100 object-fit-cover" src="${experienciaSeleccionada.imagen}" alt="${experienciaSeleccionada.textoAlternativo}"></div>
        <div class="col-md-7">
          <div class="contenido-tarjeta p-4">
            <p class="tipo-experiencia">${experienciaSeleccionada.categoria}</p>
            <h2>${experienciaSeleccionada.nombre}</h2>
            <p>${experienciaSeleccionada.descripcion}</p>
            <p class="precio-experiencia">${textoPrecio}</p>
            <div class="acciones-detalle">
              <md-filled-button id="botonAccionExperiencia">${esGratuita ? "Iniciar experiencia" : "Agregar al carrito"}</md-filled-button>
              <md-outlined-button data-href="experiencias.html">Regresar a experiencias</md-outlined-button>
            </div>
            <div id="mensajeExperienciaDetalle" aria-live="polite"></div>
            <section id="experienciaIniciada" class="experiencia-iniciada" tabindex="-1" hidden></section>
          </div>
        </div>
      </div>
    </article>
  `;

  document.getElementById("botonAccionExperiencia").addEventListener(
    "click",
    esGratuita ? iniciarExperienciaGratuita : agregarExperienciaPagada,
  );
}

mostrarDetalleExperiencia();

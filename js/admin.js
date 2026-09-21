/**
 * Interacciones simuladas del panel administrativo.
 *
 * Ninguna acción se guarda en servidor: el objetivo es practicar formularios,
 * validación y cambios de estado sin alterar la base de datos ya construida en
 * el backend. Al recargar, las modificaciones visuales se reinician.
 */
const mensajeAdmin = document.getElementById("mensajeAdmin");
const formularioAdmin = document.getElementById("formularioAdmin");
const campoTituloAdmin = document.getElementById("tituloAdmin");
const campoTipoAdmin = document.getElementById("tipoAdmin");
const mensajeTituloAdmin = document.getElementById("mensajeTituloAdmin");
const mensajeTipoAdmin = document.getElementById("mensajeTipoAdmin");
const contadorPublicadosAdmin = document.getElementById(
  "contadorPublicadosAdmin",
);
const cuerpoTablaAdmin = document.querySelector(".tabla-admin tbody");

/** Presenta el resultado tanto en la página como en el aviso temporal global. */
function mostrarMensajeAdmin(tipo, mensaje) {
  if (window.InterfazRitual) {
    const tipoSnackbar = tipo === "danger" ? "error" : tipo === "warning" ? "aviso" : "exito";
    window.InterfazRitual.mostrarSnackbar(mensaje, tipoSnackbar);
  }

  mensajeAdmin.innerHTML = `
    <div class="alert alert-${tipo} mt-3 mb-0" role="alert">
      ${mensaje}
    </div>
  `;
}

/**
 * Mantiene juntos el estilo del campo, el atributo accesible y su mensaje para
 * que todos comuniquen el mismo resultado de validación.
 */
function actualizarEstadoCampoAdmin(
  campo,
  contenedorMensaje,
  esValido,
  mensaje,
) {
  campo.classList.toggle("is-valid", esValido);
  campo.classList.toggle("is-invalid", !esValido);
  campo.setAttribute("aria-invalid", String(!esValido));
  contenedorMensaje.textContent = esValido ? "" : mensaje;
  contenedorMensaje.className = esValido
    ? "mensaje-validacion"
    : "mensaje-validacion text-danger small mt-1";
}

function validarTituloAdmin() {
  const titulo = campoTituloAdmin.value.trim();
  const esValido = titulo.length >= 4 && titulo.length <= 80;

  actualizarEstadoCampoAdmin(
    campoTituloAdmin,
    mensajeTituloAdmin,
    esValido,
    "Ingresa un título entre 4 y 80 caracteres.",
  );

  return esValido;
}

function validarTipoAdmin() {
  const esValido = campoTipoAdmin.value !== "";

  actualizarEstadoCampoAdmin(
    campoTipoAdmin,
    mensajeTipoAdmin,
    esValido,
    "Selecciona un tipo de contenido.",
  );

  return esValido;
}

function actualizarContadorPublicados() {
  const elementosPublicados = document.querySelectorAll(".estado-publicado");
  contadorPublicadosAdmin.textContent = String(elementosPublicados.length);
}

/**
 * Cambia el estado visual de una fila y reemplaza el boton disponible.
 */
/**
 * Cambia solo la fila intervenida. Reemplaza el botón porque cada estado ofrece
 * la acción opuesta: publicar si está en revisión o enviar a revisión si ya fue
 * publicado.
 */
function cambiarEstadoFila(boton, textoEstado, claseEstado) {
  const fila = boton.closest("tr");
  const etiquetaEstado = fila.querySelector(".badge");

  etiquetaEstado.className = `badge ${claseEstado}`;
  etiquetaEstado.textContent = textoEstado;

  if (claseEstado === "estado-publicado") {
    boton.replaceWith(crearBotonAccionAdmin(false));
    mostrarMensajeAdmin("success", "Contenido publicado en modo simulado.");
  } else {
    boton.replaceWith(crearBotonAccionAdmin(true));
    mostrarMensajeAdmin("warning", "Contenido enviado a revisión simulada.");
  }

  actualizarContadorPublicados();
}

function configurarBotonAdmin(boton) {
  boton.addEventListener("click", async () => {
    const vaAPublicar = boton.classList.contains("boton-admin-publicar");
    const fila = boton.closest("tr");
    const titulo = fila?.querySelector("td")?.textContent.trim() || "el contenido";

    /* El cambio de estado se confirma antes de modificar la fila simulada. */
    const confirmado = window.InterfazRitual
      ? await window.InterfazRitual.confirmar({
          titulo: vaAPublicar ? "Publicar contenido" : "Enviar a revisión",
          mensaje: `Esta acción cambiará el estado de “${titulo}” en la simulación.`,
          textoConfirmar: vaAPublicar ? "Publicar" : "Enviar a revisión",
        })
      : window.confirm("¿Deseas cambiar el estado de este contenido?");

    if (!confirmado) {
      return;
    }

    if (vaAPublicar) {
      cambiarEstadoFila(boton, "Publicado", "estado-publicado");
      return;
    }

    cambiarEstadoFila(boton, "En revisión", "estado-revision");
  });
}

/**
 * Crea un botón HTML fiable con la variante visual correcta y conecta su evento.
 */
function crearBotonAccionAdmin(esPublicar) {
  const boton = document.createElement("button");

  boton.className = esPublicar
    ? "btn btn-experiencia boton-admin-publicar"
    : "btn btn-outline-secondary boton-admin-revision";
  boton.type = "button";
  boton.textContent = esPublicar ? "Publicar" : "Enviar a revisión";
  configurarBotonAdmin(boton);

  return boton;
}

/** Construye un borrador temporal al enviar el formulario administrativo. */
function crearFilaBorrador(titulo, tipo) {
  const fila = document.createElement("tr");

  const celdaTitulo = document.createElement("td");
  const celdaTipo = document.createElement("td");
  const celdaEstado = document.createElement("td");
  const celdaAccion = document.createElement("td");
  const etiquetaEstado = document.createElement("span");
  const botonPublicar = crearBotonAccionAdmin(true);

  celdaTitulo.textContent = titulo;
  celdaTipo.textContent = tipo;

  etiquetaEstado.className = "badge estado-borrador";
  etiquetaEstado.textContent = "Borrador";
  celdaEstado.appendChild(etiquetaEstado);

  celdaAccion.appendChild(botonPublicar);

  fila.append(celdaTitulo, celdaTipo, celdaEstado, celdaAccion);
  cuerpoTablaAdmin.appendChild(fila);
}

function limpiarFormularioAdmin() {
  formularioAdmin.reset();
  campoTituloAdmin.classList.remove("is-valid", "is-invalid");
  campoTituloAdmin.removeAttribute("aria-invalid");
  campoTipoAdmin.classList.remove("is-valid", "is-invalid");
  campoTipoAdmin.removeAttribute("aria-invalid");
  mensajeTituloAdmin.textContent = "";
  mensajeTipoAdmin.textContent = "";
}

document
  .querySelectorAll(".boton-admin-publicar, .boton-admin-revision")
  .forEach(configurarBotonAdmin);

actualizarContadorPublicados();

campoTituloAdmin.addEventListener("input", validarTituloAdmin);
campoTipoAdmin.addEventListener("change", validarTipoAdmin);

formularioAdmin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tituloEsValido = validarTituloAdmin();
  const tipoEsValido = validarTipoAdmin();

  const formularioEsValido = tituloEsValido && tipoEsValido;

  if (!formularioEsValido) {
    mostrarMensajeAdmin(
      "danger",
      "Revisa los campos antes de crear el borrador simulado.",
    );
    formularioAdmin.querySelector(".is-invalid")?.focus();
    return;
  }

  crearFilaBorrador(campoTituloAdmin.value.trim(), campoTipoAdmin.value);
  mostrarMensajeAdmin("success", "Borrador agregado a la tabla simulada.");
  limpiarFormularioAdmin();
});

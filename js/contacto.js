/**
 * Formulario de contacto simulado.
 *
 * La validación ocurre en el navegador para entregar retroalimentación
 * inmediata. En una versión conectada al backend, la validación del servidor
 * seguirá siendo necesaria antes de guardar o enviar información.
 * Los elementos obtenidos a continuación conectan cada validación con su campo
 * y con el espacio donde se muestra la ayuda correspondiente.
 */
const formularioContacto = document.getElementById("formularioContacto");

const campoNombreContacto = document.getElementById("nombreContacto");
const campoCorreoContacto = document.getElementById("correoContacto");
const campoAsuntoContacto = document.getElementById("asuntoContacto");
const campoMensajeContacto = document.getElementById("mensajeContacto");

const mensajeNombreContacto = document.getElementById("mensajeNombreContacto");
const mensajeCorreoContacto = document.getElementById("mensajeCorreoContacto");
const mensajeAsuntoContacto = document.getElementById("mensajeAsuntoContacto");
const mensajeTextoContacto = document.getElementById("mensajeTextoContacto");
const mensajeFormularioContacto = document.getElementById(
  "mensajeFormularioContacto",
);

/**
 * Aplica el estado visual y accesible al control nativo correspondiente.
 */
function actualizarEstadoContacto(
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

function validarNombreContacto() {
  const nombre = campoNombreContacto.value.trim();
  const esValido = nombre.length > 0 && nombre.length <= 120;

  actualizarEstadoContacto(
    campoNombreContacto,
    mensajeNombreContacto,
    esValido,
    "Ingresa tu nombre completo.",
  );

  return esValido;
}

function validarCorreoContacto() {
  const correo = campoCorreoContacto.value.trim();
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const esValido = patronCorreo.test(correo) && correo.length <= 254;

  actualizarEstadoContacto(
    campoCorreoContacto,
    mensajeCorreoContacto,
    esValido,
    "Ingresa un correo electrónico válido.",
  );

  return esValido;
}

function validarAsuntoContacto() {
  const asunto = campoAsuntoContacto.value.trim();
  const esValido = asunto.length > 0 && asunto.length <= 80;

  actualizarEstadoContacto(
    campoAsuntoContacto,
    mensajeAsuntoContacto,
    esValido,
    "Ingresa un asunto de máximo 80 caracteres.",
  );

  return esValido;
}

function validarMensajeContacto() {
  const mensaje = campoMensajeContacto.value.trim();
  const esValido = mensaje.length >= 10 && mensaje.length <= 500;

  actualizarEstadoContacto(
    campoMensajeContacto,
    mensajeTextoContacto,
    esValido,
    "El mensaje debe contener entre 10 y 500 caracteres.",
  );

  return esValido;
}

function mostrarMensajeContacto(tipo, mensaje) {
  mensajeFormularioContacto.innerHTML = `
    <div class="alert alert-${tipo} mt-4" role="alert">
      ${mensaje}
    </div>
  `;

  /* El snackbar refuerza el resultado sin ocultar la confirmación persistente. */
  if (tipo === "success" && window.InterfazRitual) {
    window.InterfazRitual.mostrarSnackbar(mensaje);
  }
}

function limpiarEstadosContacto() {
  const campos = [
    campoNombreContacto,
    campoCorreoContacto,
    campoAsuntoContacto,
    campoMensajeContacto,
  ];

  campos.forEach((campo) => {
    campo.classList.remove("is-valid", "is-invalid");
    campo.removeAttribute("aria-invalid");
  });

  mensajeNombreContacto.textContent = "";
  mensajeCorreoContacto.textContent = "";
  mensajeAsuntoContacto.textContent = "";
  mensajeTextoContacto.textContent = "";
}

campoNombreContacto.addEventListener("input", validarNombreContacto);
campoCorreoContacto.addEventListener("input", validarCorreoContacto);
campoAsuntoContacto.addEventListener("input", validarAsuntoContacto);
campoMensajeContacto.addEventListener("input", validarMensajeContacto);

formularioContacto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombreEsValido = validarNombreContacto();
  const correoEsValido = validarCorreoContacto();
  const asuntoEsValido = validarAsuntoContacto();
  const mensajeEsValido = validarMensajeContacto();

  const formularioEsValido =
    nombreEsValido && correoEsValido && asuntoEsValido && mensajeEsValido;

  if (!formularioEsValido) {
    mostrarMensajeContacto(
      "danger",
      "Revisa los campos marcados antes de enviar tu mensaje.",
    );
    formularioContacto.querySelector(".is-invalid")?.focus();
    return;
  }

  mostrarMensajeContacto(
    "success",
    "Mensaje enviado correctamente en modo simulado.",
  );

  formularioContacto.reset();
  limpiarEstadosContacto();
});

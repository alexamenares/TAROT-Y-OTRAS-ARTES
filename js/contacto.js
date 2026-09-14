/**
 * Elementos del formulario de contacto.
 * El envio es simulado porque esta etapa todavia no usa backend.
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
 * Aplica clases de Bootstrap y muestra un mensaje personalizado por campo.
 */
function actualizarEstadoContacto(
  campo,
  contenedorMensaje,
  esValido,
  mensaje,
) {
  campo.classList.remove("is-valid", "is-invalid");

  if (esValido) {
    campo.classList.add("is-valid");
    contenedorMensaje.textContent = "";
    return;
  }

  campo.classList.add("is-invalid");
  contenedorMensaje.textContent = mensaje;
  contenedorMensaje.className = "mensaje-validacion text-danger small mt-1";
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
    return;
  }

  mostrarMensajeContacto(
    "success",
    "Mensaje enviado correctamente en modo simulado.",
  );

  formularioContacto.reset();
  limpiarEstadosContacto();
});

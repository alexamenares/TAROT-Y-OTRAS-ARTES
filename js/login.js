/**
 * Inicio de sesión simulado del MVP.
 *
 * No autentica contra el backend ni genera un token: solo demuestra el flujo
 * de validación y mensaje de acceso que la interfaz tendría antes de integrar
 * la API real.
 * Los elementos obtenidos a continuación permiten asociar cada regla con su
 * campo y con el mensaje que explica cómo corregirlo.
 */
const formularioLogin = document.getElementById("formularioLogin");

const campoCorreoLogin = document.getElementById("correoLogin");
const campoContrasenaLogin = document.getElementById("contrasenaLogin");

const mensajeCorreoLogin = document.getElementById("mensajeCorreoLogin");
const mensajeContrasenaLogin = document.getElementById(
  "mensajeContrasenaLogin",
);
const mensajeFormularioLogin = document.getElementById(
  "mensajeFormularioLogin",
);

/**
 * Actualiza el control nativo y mantiene el mensaje visible para todas las personas.
 */
function actualizarEstadoCampoLogin(
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

/**
 * Comprueba una estructura básica de correo electrónico.
 */
function validarCorreoLogin() {
  const correo = campoCorreoLogin.value.trim();

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const esValido = patronCorreo.test(correo) && correo.length <= 254;

  actualizarEstadoCampoLogin(
    campoCorreoLogin,
    mensajeCorreoLogin,
    esValido,
    "Ingresa un correo electrónico válido.",
  );

  return esValido;
}

/**
 * Para iniciar sesión se solicita una contraseña con la misma regla
 * aplicada al registro: entre 8 y 72 caracteres.
 */
function validarContrasenaLogin() {
  const contrasena = campoContrasenaLogin.value;

  const esValido = contrasena.length >= 8 && contrasena.length <= 72;

  actualizarEstadoCampoLogin(
    campoContrasenaLogin,
    mensajeContrasenaLogin,
    esValido,
    "La contraseña debe contener entre 8 y 72 caracteres.",
  );

  return esValido;
}

/**
 * Muestra un mensaje general sobre el resultado del envío.
 */
function mostrarMensajeLogin(tipo, mensaje) {
  mensajeFormularioLogin.innerHTML = `
    <div class="alert alert-${tipo} mt-4" role="alert">
      ${mensaje}
    </div>
  `;

  /* El snackbar complementa el mensaje persistente sin reemplazarlo. */
  if (tipo === "success" && window.InterfazRitual) {
    window.InterfazRitual.mostrarSnackbar(mensaje);
  }
}

/**
 * Limpia las marcas de validación tras una simulación exitosa.
 */
function limpiarEstadosLogin() {
  const campos = [campoCorreoLogin, campoContrasenaLogin];

  campos.forEach((campo) => {
    campo.classList.remove("is-valid", "is-invalid");
    campo.removeAttribute("aria-invalid");
  });

  mensajeCorreoLogin.textContent = "";
  mensajeContrasenaLogin.textContent = "";
}

/* Validación mientras el usuario escribe. */
campoCorreoLogin.addEventListener("input", validarCorreoLogin);
campoContrasenaLogin.addEventListener("input", validarContrasenaLogin);

/**
 * Por ahora simulamos el inicio de sesión.
 * En la etapa de integración enviaremos correo y contraseña al backend.
 */
formularioLogin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const correoEsValido = validarCorreoLogin();
  const contrasenaEsValida = validarContrasenaLogin();

  const formularioEsValido = correoEsValido && contrasenaEsValida;

  if (!formularioEsValido) {
    mostrarMensajeLogin("danger", "Revisa tus datos antes de continuar.");
    formularioLogin.querySelector(".is-invalid")?.focus();
    return;
  }

  mostrarMensajeLogin("success", "Inicio de sesión simulado correctamente.");

  formularioLogin.reset();
  limpiarEstadosLogin();
});

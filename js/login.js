/**
 * Obtenemos el formulario, los campos y los espacios para los mensajes.
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
 * Actualiza visualmente un campo válido o inválido.
 * Bootstrap utiliza is-valid e is-invalid para sus estilos de validación.
 */
function actualizarEstadoCampoLogin(
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
}

/**
 * Limpia las marcas de validación tras una simulación exitosa.
 */
function limpiarEstadosLogin() {
  const campos = [campoCorreoLogin, campoContrasenaLogin];

  campos.forEach((campo) => {
    campo.classList.remove("is-valid", "is-invalid");
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
    return;
  }

  mostrarMensajeLogin("success", "Inicio de sesión simulado correctamente.");

  formularioLogin.reset();
  limpiarEstadosLogin();
});

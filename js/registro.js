/**
 * Registro simulado del MVP.
 *
 * El formulario enseña validación en tiempo real y accesibilidad, pero no crea
 * usuarios en la base de datos. Esa conexión se implementará cuando el frontend
 * se integre con el backend ya construido.
 * Los elementos obtenidos a continuación permiten validar el formulario sin
 * depender de mensajes nativos distintos en cada navegador.
 */
const formularioRegistro = document.getElementById("formularioRegistro");

const campoNombreCompleto = document.getElementById("nombreCompleto");
const campoCorreo = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");
const campoConfirmarContrasena = document.getElementById("confirmarContrasena");
const campoAceptaTratamientoDatos = document.getElementById(
  "aceptaTratamientoDatos",
);

const mensajeNombreCompleto = document.getElementById("mensajeNombreCompleto");
const mensajeCorreo = document.getElementById("mensajeCorreo");
const mensajeContrasena = document.getElementById("mensajeContrasena");
const mensajeConfirmarContrasena = document.getElementById(
  "mensajeConfirmarContrasena",
);
const mensajeAceptaTratamientoDatos = document.getElementById(
  "mensajeAceptaTratamientoDatos",
);
const mensajeFormulario = document.getElementById("mensajeFormulario");

/**
 * Actualiza el estado visual y accesible de un control nativo del formulario.
 */
function actualizarEstadoCampo(campo, contenedorMensaje, esValido, mensaje) {
  campo.classList.toggle("is-valid", esValido);
  campo.classList.toggle("is-invalid", !esValido);
  campo.setAttribute("aria-invalid", String(!esValido));
  contenedorMensaje.textContent = esValido ? "" : mensaje;
  contenedorMensaje.className = esValido
    ? "mensaje-validacion"
    : "mensaje-validacion text-danger small mt-1";
}

/**
 * El nombre debe contener algún texto y no superar el límite del backend.
 */
function validarNombreCompleto() {
  const nombre = campoNombreCompleto.value.trim();

  const esValido = nombre.length > 0 && nombre.length <= 120;

  actualizarEstadoCampo(
    campoNombreCompleto,
    mensajeNombreCompleto,
    esValido,
    "Ingresa tu nombre completo.",
  );

  return esValido;
}

/**
 * Comprueba una estructura básica y comprensible de correo electrónico.
 * Esta validación es visual; el backend hará su propia validación más adelante.
 */
function validarCorreo() {
  const correo = campoCorreo.value.trim();

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const esValido = patronCorreo.test(correo) && correo.length <= 254;

  actualizarEstadoCampo(
    campoCorreo,
    mensajeCorreo,
    esValido,
    "Ingresa un correo electrónico válido.",
  );

  return esValido;
}

/**
 * La regla coincide con el backend actual:
 * contraseña de mínimo 8 y máximo 72 caracteres.
 */
function validarContrasena() {
  const contrasena = campoContrasena.value;

  const esValido = contrasena.length >= 8 && contrasena.length <= 72;

  actualizarEstadoCampo(
    campoContrasena,
    mensajeContrasena,
    esValido,
    "La contraseña debe contener entre 8 y 72 caracteres.",
  );

  return esValido;
}

/**
 * Verifica que la confirmación exista y sea igual a la contraseña escrita.
 */
function validarConfirmarContrasena() {
  const confirmarContrasena = campoConfirmarContrasena.value;

  const esValido =
    confirmarContrasena.length > 0 &&
    confirmarContrasena === campoContrasena.value;

  actualizarEstadoCampo(
    campoConfirmarContrasena,
    mensajeConfirmarContrasena,
    esValido,
    "Las contraseñas no coinciden.",
  );

  return esValido;
}

/**
 * El checkbox deja visible que el MVP informa el uso simulado de nombre y correo.
 */
function validarAceptaTratamientoDatos() {
  const esValido = campoAceptaTratamientoDatos.checked;

  actualizarEstadoCampo(
    campoAceptaTratamientoDatos,
    mensajeAceptaTratamientoDatos,
    esValido,
    "Debes aceptar el tratamiento de datos para continuar.",
  );

  return esValido;
}

/**
 * El mensaje general informa el resultado del envío del formulario.
 */
function mostrarMensajeFormulario(tipo, mensaje) {
  mensajeFormulario.innerHTML = `
    <div class="alert alert-${tipo} mt-4" role="alert">
      ${mensaje}
    </div>
  `;

  /* El éxito permanece visible y también se anuncia mediante el snackbar. */
  if (tipo === "success" && window.InterfazRitual) {
    window.InterfazRitual.mostrarSnackbar(mensaje);
  }
}

/**
 * Quita los colores y mensajes de validación después de un registro simulado.
 */
function limpiarEstadosValidacion() {
  const campos = [
    campoNombreCompleto,
    campoCorreo,
    campoContrasena,
    campoConfirmarContrasena,
    campoAceptaTratamientoDatos,
  ];

  campos.forEach((campo) => {
    campo.classList.remove("is-valid", "is-invalid");
    campo.removeAttribute("aria-invalid");
  });

  mensajeNombreCompleto.textContent = "";
  mensajeCorreo.textContent = "";
  mensajeContrasena.textContent = "";
  mensajeConfirmarContrasena.textContent = "";
  mensajeAceptaTratamientoDatos.textContent = "";
}

/* Validación mientras el usuario escribe en cada campo. */
campoNombreCompleto.addEventListener("input", validarNombreCompleto);
campoCorreo.addEventListener("input", validarCorreo);

campoContrasena.addEventListener("input", () => {
  validarContrasena();

  /*
   * Si el usuario ya escribió una confirmación, la revisamos nuevamente
   * porque cambiar la primera contraseña puede dejar de coincidir.
   */
  if (campoConfirmarContrasena.value !== "") {
    validarConfirmarContrasena();
  }
});

campoConfirmarContrasena.addEventListener("input", validarConfirmarContrasena);
campoAceptaTratamientoDatos.addEventListener(
  "change",
  validarAceptaTratamientoDatos,
);

/**
 * Al enviar, se revisan todos los campos.
 * Por ahora simulamos el registro: aún no enviamos datos al backend.
 */
formularioRegistro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombreEsValido = validarNombreCompleto();
  const correoEsValido = validarCorreo();
  const contrasenaEsValida = validarContrasena();
  const confirmacionEsValida = validarConfirmarContrasena();
  const tratamientoDatosEsValido = validarAceptaTratamientoDatos();

  const formularioEsValido =
    nombreEsValido &&
    correoEsValido &&
    contrasenaEsValida &&
    confirmacionEsValida &&
    tratamientoDatosEsValido;

  if (!formularioEsValido) {
    mostrarMensajeFormulario(
      "danger",
      "Revisa los campos marcados antes de crear tu cuenta.",
    );
    formularioRegistro.querySelector(".is-invalid")?.focus();
    return;
  }

  mostrarMensajeFormulario("success", "Registro simulado correctamente.");

  formularioRegistro.reset();
  limpiarEstadosValidacion();
});

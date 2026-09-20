/**
 * Login simulado.
 * - Valida correo y contraseña con las reglas del proyecto.
 * - Busca al usuario en "usuariosAdmin" (localStorage).
 * - Si existe, guarda la sesión y redirige al panel admin
 *   cuando el rol tiene acceso.
 * - Si no existe, permite el acceso simulado como "consultante".
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
 * Validación de correo con patrón general.
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
 * Regla del proyecto: contraseña entre 8 y 72 caracteres.
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
 * Limpia las marcas de validación.
 */
function limpiarEstadosLogin() {
  const campos = [campoCorreoLogin, campoContrasenaLogin];

  campos.forEach((campo) => {
    campo.classList.remove("is-valid", "is-invalid");
  });

  mensajeCorreoLogin.textContent = "";
  mensajeContrasenaLogin.textContent = "";
}

/**
 * Busca un usuario en el arreglo administrado por el panel admin.
 * Si el mantenedor aún no existe en localStorage, devuelve null.
 */
function buscarUsuarioPorCorreo(correo) {
  const guardados = localStorage.getItem("usuariosAdmin");

  if (!guardados) return null;

  try {
    const lista = JSON.parse(guardados);

    if (!Array.isArray(lista)) return null;

    return (
      lista.find(
        (usuario) =>
          String(usuario.correo).toLowerCase() === correo.toLowerCase(),
      ) || null
    );
  } catch (error) {
    return null;
  }
}

/**
 * Guarda la sesión simulada en localStorage.
 */
function guardarSesionLogin(usuario) {
  const sesion = {
    id: usuario.id,
    nombre: `${usuario.nombre} ${usuario.apellidos || ""}`.trim(),
    correo: usuario.correo,
    rol: usuario.rol,
    fechaIngreso: new Date().toISOString(),
  };

  localStorage.setItem("usuarioSesion", JSON.stringify(sesion));
}

/**
 * Decide a dónde redirigir según el rol del usuario.
 */
function redirigirSegunRol(rol) {
  if (rol === "admin" || rol === "guia") {
    window.location.href = "admin.html";
    return;
  }

  /* Consultante: vuelve al inicio del sitio público. */
  window.location.href = "index.html";
}

/* Validación en vivo */
campoCorreoLogin.addEventListener("input", validarCorreoLogin);
campoContrasenaLogin.addEventListener("input", validarContrasenaLogin);

formularioLogin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const correoEsValido = validarCorreoLogin();
  const contrasenaEsValida = validarContrasenaLogin();

  if (!correoEsValido || !contrasenaEsValida) {
    mostrarMensajeLogin("danger", "Revisa tus datos antes de continuar.");
    return;
  }

  const correo = campoCorreoLogin.value.trim();
  const usuarioEncontrado = buscarUsuarioPorCorreo(correo);

  if (usuarioEncontrado) {
    /* Usuario real del mantenedor: guardamos su sesión. */
    guardarSesionLogin(usuarioEncontrado);

    mostrarMensajeLogin(
      "success",
      `Bienvenido, ${usuarioEncontrado.nombre}. Redirigiendo al panel...`,
    );

    setTimeout(() => redirigirSegunRol(usuarioEncontrado.rol), 900);
    return;
  }

  /* Usuario no registrado: acceso simulado como consultante. */
  const sesionSimulada = {
    id: "invitado",
    nombre: "Visitante",
    apellidos: "",
    correo,
    rol: "consultante",
  };

  guardarSesionLogin(sesionSimulada);

  mostrarMensajeLogin(
    "success",
    "Inicio de sesión simulado correctamente. Volviendo al inicio...",
  );

  setTimeout(() => {
    formularioLogin.reset();
    limpiarEstadosLogin();
    window.location.href = "index.html";
  }, 900);
});

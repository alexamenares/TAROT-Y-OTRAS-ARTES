/**
 * Registro de usuario simulado.
 * - Valida RUN con dígito verificador (módulo 11).
 * - Valida correo, contraseña, confirmación, región, comuna y dirección.
 * - Región → Comuna en cascada usando regionesComunasChile.
 * - Guarda el usuario en "usuariosAdmin" (localStorage) y crea sesión.
 */
const formularioRegistro = document.getElementById("formularioRegistro");

const campoRun = document.getElementById("run");
const campoNombreCompleto = document.getElementById("nombreCompleto");
const campoCorreo = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");
const campoConfirmarContrasena = document.getElementById("confirmarContrasena");
const campoTelefono = document.getElementById("telefono");
const campoRegion = document.getElementById("region");
const campoComuna = document.getElementById("comuna");
const campoDireccion = document.getElementById("direccion");
const campoAceptaTratamientoDatos = document.getElementById(
  "aceptaTratamientoDatos",
);

const mensajeRun = document.getElementById("mensajeRun");
const mensajeNombreCompleto = document.getElementById("mensajeNombreCompleto");
const mensajeCorreo = document.getElementById("mensajeCorreo");
const mensajeContrasena = document.getElementById("mensajeContrasena");
const mensajeConfirmarContrasena = document.getElementById(
  "mensajeConfirmarContrasena",
);
const mensajeTelefono = document.getElementById("mensajeTelefono");
const mensajeRegion = document.getElementById("mensajeRegion");
const mensajeComuna = document.getElementById("mensajeComuna");
const mensajeDireccion = document.getElementById("mensajeDireccion");
const mensajeAceptaTratamientoDatos = document.getElementById(
  "mensajeAceptaTratamientoDatos",
);
const mensajeFormulario = document.getElementById("mensajeFormulario");

/**
 * Utilidad general para actualizar estados de campo.
 */
function actualizarEstadoCampo(campo, contenedorMensaje, esValido, mensaje) {
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

/* ---------- RUN (módulo 11) ---------- */
function limpiarRun(run) {
  return run.replace(/[.\-\s]/g, "").toUpperCase();
}

function calcularDigitoVerificador(cuerpo) {
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const resultado = 11 - resto;

  if (resultado === 11) return "0";
  if (resultado === 10) return "K";
  return String(resultado);
}

function validarRunCompleto(run) {
  const limpio = limpiarRun(run);
  if (!/^\d{7,9}[0-9K]$/.test(limpio)) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  return calcularDigitoVerificador(cuerpo) === dv;
}

function validarRun() {
  const valor = campoRun.value.trim();
  const ok = validarRunCompleto(valor);

  actualizarEstadoCampo(
    campoRun,
    mensajeRun,
    ok,
    "RUN inválido. Ej: 19011022K (sin puntos ni guion).",
  );

  return ok;
}

/* ---------- Otros campos ---------- */
function validarNombreCompleto() {
  const nombre = campoNombreCompleto.value.trim();
  const ok = nombre.length > 0 && nombre.length <= 120;

  actualizarEstadoCampo(
    campoNombreCompleto,
    mensajeNombreCompleto,
    ok,
    "Ingresa tu nombre completo.",
  );

  return ok;
}

function validarCorreo() {
  const correo = campoCorreo.value.trim();
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ok = patron.test(correo) && correo.length <= 254;

  actualizarEstadoCampo(
    campoCorreo,
    mensajeCorreo,
    ok,
    "Ingresa un correo electrónico válido.",
  );

  return ok;
}

function validarContrasena() {
  const contrasena = campoContrasena.value;
  const ok = contrasena.length >= 8 && contrasena.length <= 72;

  actualizarEstadoCampo(
    campoContrasena,
    mensajeContrasena,
    ok,
    "La contraseña debe contener entre 8 y 72 caracteres.",
  );

  return ok;
}

function validarConfirmarContrasena() {
  const confirmar = campoConfirmarContrasena.value;
  const ok = confirmar.length > 0 && confirmar === campoContrasena.value;

  actualizarEstadoCampo(
    campoConfirmarContrasena,
    mensajeConfirmarContrasena,
    ok,
    "Las contraseñas no coinciden.",
  );

  return ok;
}

function validarTelefono() {
  const telefono = campoTelefono.value.trim();

  if (telefono === "") {
    /* Es opcional, pero si está vacío limpiamos el mensaje. */
    campoTelefono.classList.remove("is-valid", "is-invalid");
    mensajeTelefono.textContent = "";
    return true;
  }

  const patron = /^\+?[0-9\s]{8,15}$/;
  const ok = patron.test(telefono);

  actualizarEstadoCampo(
    campoTelefono,
    mensajeTelefono,
    ok,
    "Ingresa un teléfono válido (ej: +56912345678).",
  );

  return ok;
}

function validarRegion() {
  const ok = campoRegion.value !== "";

  actualizarEstadoCampo(
    campoRegion,
    mensajeRegion,
    ok,
    "Selecciona una región.",
  );

  return ok;
}

function validarComuna() {
  const ok = campoComuna.value !== "";

  actualizarEstadoCampo(
    campoComuna,
    mensajeComuna,
    ok,
    "Selecciona una comuna.",
  );

  return ok;
}

function validarDireccion() {
  const direccion = campoDireccion.value.trim();
  const ok = direccion.length > 0 && direccion.length <= 300;

  actualizarEstadoCampo(
    campoDireccion,
    mensajeDireccion,
    ok,
    "La dirección es obligatoria (máx. 300 caracteres).",
  );

  return ok;
}

function validarAceptaTratamientoDatos() {
  const ok = campoAceptaTratamientoDatos.checked;

  actualizarEstadoCampo(
    campoAceptaTratamientoDatos,
    mensajeAceptaTratamientoDatos,
    ok,
    "Debes aceptar el tratamiento de datos para continuar.",
  );

  return ok;
}

/* ---------- Región → Comuna en cascada ---------- */
function poblarRegiones() {
  regionesComunasChile.forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r.region;
    opt.textContent = r.region;
    campoRegion.appendChild(opt);
  });
}

function poblarComunas(region) {
  campoComuna.innerHTML = `<option value="">Selecciona una comuna</option>`;

  const encontrada = regionesComunasChile.find((r) => r.region === region);
  if (!encontrada) return;

  encontrada.comunas.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    campoComuna.appendChild(opt);
  });
}

/* ---------- Mensajes y limpieza ---------- */
function mostrarMensajeFormulario(tipo, mensaje) {
  mensajeFormulario.innerHTML = `
    <div class="alert alert-${tipo} mt-4" role="alert">
      ${mensaje}
    </div>
  `;
}

function limpiarEstadosValidacion() {
  const campos = [
    campoRun,
    campoNombreCompleto,
    campoCorreo,
    campoContrasena,
    campoConfirmarContrasena,
    campoTelefono,
    campoRegion,
    campoComuna,
    campoDireccion,
    campoAceptaTratamientoDatos,
  ];

  campos.forEach((campo) => campo.classList.remove("is-valid", "is-invalid"));

  [
    mensajeRun,
    mensajeNombreCompleto,
    mensajeCorreo,
    mensajeContrasena,
    mensajeConfirmarContrasena,
    mensajeTelefono,
    mensajeRegion,
    mensajeComuna,
    mensajeDireccion,
    mensajeAceptaTratamientoDatos,
  ].forEach((m) => (m.textContent = ""));
}

/* ---------- Guardar en usuariosAdmin ---------- */
function guardarUsuarioRegistrado(datos) {
  let lista = [];

  try {
    const guardados = localStorage.getItem("usuariosAdmin");
    if (guardados) {
      const parsed = JSON.parse(guardados);
      if (Array.isArray(parsed)) lista = parsed;
    }
  } catch (error) {
    lista = [];
  }

  /* Evita duplicar correo. */
  const existe = lista.some(
    (usuario) =>
      String(usuario.correo).toLowerCase() === datos.correo.toLowerCase(),
  );

  if (existe) return { ok: false, motivo: "correo-duplicado" };

  const nuevo = {
    id: `usr-${Date.now()}`,
    ...datos,
    estado: "activo",
  };

  lista.push(nuevo);
  localStorage.setItem("usuariosAdmin", JSON.stringify(lista));

  return { ok: true, usuario: nuevo };
}

function guardarSesionRegistro(usuario) {
  const sesion = {
    id: usuario.id,
    nombre: `${usuario.nombre} ${usuario.apellidos || ""}`.trim(),
    correo: usuario.correo,
    rol: usuario.rol,
    fechaIngreso: new Date().toISOString(),
  };

  localStorage.setItem("usuarioSesion", JSON.stringify(sesion));
}

/* ---------- Eventos de validación en vivo ---------- */
campoRun.addEventListener("input", validarRun);
campoNombreCompleto.addEventListener("input", validarNombreCompleto);
campoCorreo.addEventListener("input", validarCorreo);
campoTelefono.addEventListener("input", validarTelefono);
campoRegion.addEventListener("change", () => {
  poblarComunas(campoRegion.value);
  validarRegion();
  validarComuna();
});
campoComuna.addEventListener("change", validarComuna);
campoDireccion.addEventListener("input", validarDireccion);
campoAceptaTratamientoDatos.addEventListener(
  "change",
  validarAceptaTratamientoDatos,
);

campoContrasena.addEventListener("input", () => {
  validarContrasena();
  if (campoConfirmarContrasena.value !== "") validarConfirmarContrasena();
});

campoConfirmarContrasena.addEventListener("input", validarConfirmarContrasena);

/* ---------- Submit ---------- */
formularioRegistro.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const vRun = validarRun();
  const vNombre = validarNombreCompleto();
  const vCorreo = validarCorreo();
  const vContrasena = validarContrasena();
  const vConfirmar = validarConfirmarContrasena();
  const vTelefono = validarTelefono();
  const vRegion = validarRegion();
  const vComuna = validarComuna();
  const vDireccion = validarDireccion();
  const vTratamiento = validarAceptaTratamientoDatos();

  const todoValido =
    vRun &&
    vNombre &&
    vCorreo &&
    vContrasena &&
    vConfirmar &&
    vTelefono &&
    vRegion &&
    vComuna &&
    vDireccion &&
    vTratamiento;

  if (!todoValido) {
    mostrarMensajeFormulario(
      "danger",
      "Revisa los campos marcados antes de crear tu cuenta.",
    );
    return;
  }

  const runLimpio = limpiarRun(campoRun.value);
  const nombrePartes = campoNombreCompleto.value.trim().split(/\s+/);
  const nombre = nombrePartes.shift() || "";
  const apellidos = nombrePartes.join(" ");

  const datos = {
    run: runLimpio,
    nombre,
    apellidos,
    correo: campoCorreo.value.trim(),
    telefono: campoTelefono.value.trim(),
    region: campoRegion.value,
    comuna: campoComuna.value,
    direccion: campoDireccion.value.trim(),
    fechaNacimiento: "",
    rol: "consultante",
  };

  const resultado = guardarUsuarioRegistrado(datos);

  if (!resultado.ok) {
    mostrarMensajeFormulario(
      "danger",
      "Ya existe una cuenta registrada con ese correo.",
    );
    return;
  }

  guardarSesionRegistro(resultado.usuario);

  mostrarMensajeFormulario(
    "success",
    "Registro simulado correctamente. Bienvenido a Tarot y Otras Artes.",
  );

  setTimeout(() => {
    formularioRegistro.reset();
    limpiarEstadosValidacion();
    window.location.href = "index.html";
  }, 1200);
});

/* ---------- Inicialización ---------- */
poblarRegiones();

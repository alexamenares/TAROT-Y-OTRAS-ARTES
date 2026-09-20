/**
 * Mantenedor de usuarios del panel admin.
 * Lee y escribe el arreglo "usuariosAdmin" en localStorage.
 * Si no existe, lo inicializa desde datos-usuarios.js.
 *
 * Incluye validación de RUN con módulo 11 y cascada región → comuna.
 */

const CLAVE_USUARIOS_ADMIN = "usuariosAdmin";

/* ---------- Persistencia ---------- */
function leerUsuariosAdmin() {
  const guardados = localStorage.getItem(CLAVE_USUARIOS_ADMIN);

  if (guardados === null) {
    localStorage.setItem(
      CLAVE_USUARIOS_ADMIN,
      JSON.stringify(usuariosSemilla),
    );
    return [...usuariosSemilla];
  }

  try {
    const lista = JSON.parse(guardados);
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    return [];
  }
}

function guardarUsuariosAdmin(lista) {
  localStorage.setItem(CLAVE_USUARIOS_ADMIN, JSON.stringify(lista));
}

/* ---------- Validación de RUN (módulo 11) ---------- */
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

/* ---------- Listado ---------- */
function etiquetaRol(rol) {
  const mapa = {
    admin: "Administrador",
    guia: "Guía",
    consultante: "Consultante",
  };
  return mapa[rol] || rol;
}

function claseRol(rol) {
  const mapa = {
    admin: "estado-publicado",
    guia: "estado-revision",
    consultante: "estado-disponible",
  };
  return mapa[rol] || "estado-borrador";
}

function crearFilaUsuario(usr) {
  return `
    <tr>
      <td>${usr.run}</td>
      <td><strong>${usr.nombre} ${usr.apellidos}</strong></td>
      <td>${usr.correo}</td>
      <td>
        <span class="badge ${claseRol(usr.rol)}">${etiquetaRol(usr.rol)}</span>
      </td>
      <td>${usr.region || "—"}</td>
      <td class="text-end">
        <a
          class="btn btn-sm boton-admin-secundario"
          href="admin-usuarios-form.html?id=${usr.id}"
        >
          Editar
        </a>
        <button
          class="btn btn-sm btn-outline-danger"
          data-eliminar-usuario="${usr.id}"
          type="button"
        >
          Eliminar
        </button>
      </td>
    </tr>
  `;
}

function configurarEliminarUsuario() {
  document
    .querySelectorAll("[data-eliminar-usuario]")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        const id = boton.dataset.eliminarUsuario;
        const lista = leerUsuariosAdmin();
        const filtrada = lista.filter((u) => u.id !== id);

        guardarUsuariosAdmin(filtrada);
        renderizarListadoUsuarios();

        const mensaje = document.getElementById("mensajeAdminUsuarios");
        if (mensaje) {
          mensaje.innerHTML = `
            <div class="alert alert-success mb-0" role="alert">
              Usuario eliminado (modo simulado).
            </div>
          `;
        }
      });
    });
}

function renderizarListadoUsuarios() {
  const cuerpo = document.getElementById("cuerpoTablaUsuarios");
  if (!cuerpo) return;

  const lista = leerUsuariosAdmin();

  if (lista.length === 0) {
    cuerpo.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-muted">
          No hay usuarios registrados todavía.
        </td>
      </tr>
    `;
    return;
  }

  cuerpo.innerHTML = lista.map(crearFilaUsuario).join("");
  configurarEliminarUsuario();
}

/* ---------- Formulario ---------- */
function leerParametroIdUsuario() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id && id.trim() !== "" ? id : null;
}

function actualizarEstadoCampoUsuario(campo, contenedor, esValido, mensaje) {
  if (!campo || !contenedor) return;
  campo.classList.remove("is-valid", "is-invalid");

  if (esValido) {
    campo.classList.add("is-valid");
    contenedor.textContent = "";
    return;
  }

  campo.classList.add("is-invalid");
  contenedor.textContent = mensaje;
  contenedor.className = "mensaje-validacion text-danger small mt-1";
}

function validarRunUsuario() {
  const campo = document.getElementById("runUsuario");
  const msj = document.getElementById("mensajeRunUsuario");
  const valor = campo.value.trim();
  const ok = validarRunCompleto(valor);
  actualizarEstadoCampoUsuario(
    campo,
    msj,
    ok,
    "RUN inválido. Verifica el formato (ej: 19011022K) y dígito verificador.",
  );
  return ok;
}

function validarNombreUsuario() {
  const campo = document.getElementById("nombreUsuario");
  const msj = document.getElementById("mensajeNombreUsuario");
  const v = campo.value.trim();
  const ok = v.length > 0 && v.length <= 50;
  actualizarEstadoCampoUsuario(
    campo,
    msj,
    ok,
    "El nombre es obligatorio (máx. 50).",
  );
  return ok;
}

function validarApellidosUsuario() {
  const campo = document.getElementById("apellidosUsuario");
  const msj = document.getElementById("mensajeApellidosUsuario");
  const v = campo.value.trim();
  const ok = v.length > 0 && v.length <= 100;
  actualizarEstadoCampoUsuario(
    campo,
    msj,
    ok,
    "Los apellidos son obligatorios (máx. 100).",
  );
  return ok;
}

function validarCorreoUsuario() {
  const campo = document.getElementById("correoUsuario");
  const msj = document.getElementById("mensajeCorreoUsuario");
  const v = campo.value.trim();
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ok = patron.test(v) && v.length <= 100;
  actualizarEstadoCampoUsuario(campo, msj, ok, "Correo electrónico inválido.");
  return ok;
}

function validarRegionUsuario() {
  const campo = document.getElementById("regionUsuario");
  const msj = document.getElementById("mensajeRegionUsuario");
  const ok = campo.value !== "";
  actualizarEstadoCampoUsuario(campo, msj, ok, "Selecciona una región.");
  return ok;
}

function validarComunaUsuario() {
  const campo = document.getElementById("comunaUsuario");
  const msj = document.getElementById("mensajeComunaUsuario");
  const ok = campo.value !== "";
  actualizarEstadoCampoUsuario(campo, msj, ok, "Selecciona una comuna.");
  return ok;
}

function validarDireccionUsuario() {
  const campo = document.getElementById("direccionUsuario");
  const msj = document.getElementById("mensajeDireccionUsuario");
  const v = campo.value.trim();
  const ok = v.length > 0 && v.length <= 300;
  actualizarEstadoCampoUsuario(
    campo,
    msj,
    ok,
    "La dirección es obligatoria (máx. 300).",
  );
  return ok;
}

function validarRolUsuario() {
  const campo = document.getElementById("rolUsuario");
  const msj = document.getElementById("mensajeRolUsuario");
  const ok = campo.value !== "";
  actualizarEstadoCampoUsuario(campo, msj, ok, "Selecciona un rol.");
  return ok;
}

/* ---------- Cascada Región → Comuna ---------- */
function poblarRegiones() {
  const select = document.getElementById("regionUsuario");
  if (!select) return;

  regionesComunasChile.forEach((r) => {
    const opt = document.createElement("option");
    opt.value = r.region;
    opt.textContent = r.region;
    select.appendChild(opt);
  });
}

function poblarComunas(region, valorSeleccionado = "") {
  const select = document.getElementById("comunaUsuario");
  if (!select) return;

  select.innerHTML = `<option value="">Selecciona una comuna</option>`;

  const encontrada = regionesComunasChile.find((r) => r.region === region);
  if (!encontrada) return;

  encontrada.comunas.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    if (c === valorSeleccionado) opt.selected = true;
    select.appendChild(opt);
  });
}

/* ---------- Cargar datos para editar ---------- */
function cargarUsuarioEnFormulario(id) {
  if (!id) return;

  const lista = leerUsuariosAdmin();
  const usr = lista.find((u) => u.id === id);
  if (!usr) return;

  const titulo = document.getElementById("tituloFormularioUsuario");
  if (titulo) titulo.textContent = "Editar usuario";

  document.getElementById("runUsuario").value = usr.run || "";
  document.getElementById("nombreUsuario").value = usr.nombre || "";
  document.getElementById("apellidosUsuario").value = usr.apellidos || "";
  document.getElementById("correoUsuario").value = usr.correo || "";
  document.getElementById("telefonoUsuario").value = usr.telefono || "";
  document.getElementById("direccionUsuario").value = usr.direccion || "";
  document.getElementById("fechaNacimientoUsuario").value =
    usr.fechaNacimiento || "";
  document.getElementById("rolUsuario").value = usr.rol || "";

  document.getElementById("regionUsuario").value = usr.region || "";
  poblarComunas(usr.region || "", usr.comuna || "");
}

/* ---------- Submit ---------- */
function mostrarMensajeFormularioUsuario(tipo, texto) {
  const contenedor = document.getElementById("mensajeFormularioUsuario");
  if (!contenedor) return;
  contenedor.innerHTML = `
    <div class="alert alert-${tipo} mb-0" role="alert">${texto}</div>
  `;
}

function configurarFormularioUsuario() {
  const formulario = document.getElementById("formularioUsuario");
  if (!formulario) return;

  poblarRegiones();

  const idActual = leerParametroIdUsuario();
  cargarUsuarioEnFormulario(idActual);

  document
    .getElementById("regionUsuario")
    .addEventListener("change", (evento) => {
      poblarComunas(evento.target.value);
    });

  /* Validaciones en vivo */
  document.getElementById("runUsuario").addEventListener("input", validarRunUsuario);
  document
    .getElementById("nombreUsuario")
    .addEventListener("input", validarNombreUsuario);
  document
    .getElementById("apellidosUsuario")
    .addEventListener("input", validarApellidosUsuario);
  document
    .getElementById("correoUsuario")
    .addEventListener("input", validarCorreoUsuario);
  document
    .getElementById("regionUsuario")
    .addEventListener("change", validarRegionUsuario);
  document
    .getElementById("comunaUsuario")
    .addEventListener("change", validarComunaUsuario);
  document
    .getElementById("direccionUsuario")
    .addEventListener("input", validarDireccionUsuario);
  document
    .getElementById("rolUsuario")
    .addEventListener("change", validarRolUsuario);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const vRun = validarRunUsuario();
    const vNombre = validarNombreUsuario();
    const vApellidos = validarApellidosUsuario();
    const vCorreo = validarCorreoUsuario();
    const vRegion = validarRegionUsuario();
    const vComuna = validarComunaUsuario();
    const vDireccion = validarDireccionUsuario();
    const vRol = validarRolUsuario();

    if (
      !vRun ||
      !vNombre ||
      !vApellidos ||
      !vCorreo ||
      !vRegion ||
      !vComuna ||
      !vDireccion ||
      !vRol
    ) {
      mostrarMensajeFormularioUsuario(
        "danger",
        "Revisa los campos marcados antes de guardar.",
      );
      return;
    }

    const lista = leerUsuariosAdmin();

    const datos = {
      run: limpiarRun(document.getElementById("runUsuario").value),
      nombre: document.getElementById("nombreUsuario").value.trim(),
      apellidos: document.getElementById("apellidosUsuario").value.trim(),
      correo: document.getElementById("correoUsuario").value.trim(),
      telefono: document.getElementById("telefonoUsuario").value.trim(),
      region: document.getElementById("regionUsuario").value,
      comuna: document.getElementById("comunaUsuario").value,
      direccion: document.getElementById("direccionUsuario").value.trim(),
      fechaNacimiento:
        document.getElementById("fechaNacimientoUsuario").value || "",
      rol: document.getElementById("rolUsuario").value,
      estado: "activo",
    };

    if (idActual) {
      const indice = lista.findIndex((u) => u.id === idActual);
      if (indice !== -1) lista[indice] = { ...lista[indice], ...datos };
    } else {
      const nuevoId = `usr-${Date.now()}`;
      lista.push({ id: nuevoId, ...datos });
    }

    guardarUsuariosAdmin(lista);
    mostrarMensajeFormularioUsuario(
      "success",
      "Usuario guardado (modo simulado).",
    );

    setTimeout(() => {
      window.location.href = "admin-usuarios.html";
    }, 900);
  });
}

/* ---------- Arranque ---------- */
if (document.getElementById("cuerpoTablaUsuarios")) {
  renderizarListadoUsuarios();
}

if (document.getElementById("formularioUsuario")) {
  configurarFormularioUsuario();
}

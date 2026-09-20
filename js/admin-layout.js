/**
 * Layout común del panel administrativo.
 * - Inyecta la sidebar en cada página admin.
 * - Verifica la sesión simulada (usuarioSesion en localStorage).
 * - Adapta el menú visible según el rol del usuario.
 *
 * Roles del proyecto (adaptados al tema Tarot):
 * - admin       → acceso total (equivalente a Administrador).
 * - guia        → ve experiencias y reservas (equivalente a Vendedor).
 * - consultante → sin acceso al panel (equivalente a Cliente).
 */
const ROLES_ADMIN = {
  admin: {
    nombreVisible: "Administrador",
    menuPermitido: ["home", "experiencias", "usuarios"],
  },
  guia: {
    nombreVisible: "Guía",
    menuPermitido: ["home", "experiencias"],
  },
};

/**
 * Obtiene la sesión simulada desde localStorage.
 * Si no existe, devuelve null.
 */
function obtenerSesionAdmin() {
  try {
    const sesionGuardada = localStorage.getItem("usuarioSesion");

    if (!sesionGuardada) return null;

    const sesion = JSON.parse(sesionGuardada);

    if (!sesion || !sesion.rol || !ROLES_ADMIN[sesion.rol]) {
      return null;
    }

    return sesion;
  } catch (error) {
    return null;
  }
}

/**
 * Cierra la sesión simulada y vuelve al login.
 */
function cerrarSesionAdmin() {
  localStorage.removeItem("usuarioSesion");
  window.location.href = "login.html";
}

/**
 * Devuelve el HTML de los iconos SVG del menú.
 */
function iconoMenuAdmin(tipo) {
  if (tipo === "home") {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10 12 3l9 7v10a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2Z" stroke-linejoin="round"/></svg>`;
  }
  if (tipo === "experiencias") {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M8 4v16"/></svg>`;
  }
  if (tipo === "usuarios") {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`;
  }
  return "";
}

/**
 * Construye una entrada del menú.
 */
function construirEntradaMenu(clave, etiqueta, href, activo) {
  return `
    <li>
      <a
        class="admin-menu-enlace ${activo ? "activo" : ""}"
        href="${href}"
      >
        ${iconoMenuAdmin(clave)}
        <span>${etiqueta}</span>
      </a>
    </li>
  `;
}

/**
 * Renderiza la sidebar completa dentro del contenedor con id "adminSidebar".
 * Se adapta al rol del usuario.
 */
function renderizarSidebar() {
  const sesion = obtenerSesionAdmin();
  const contenedorSidebar = document.getElementById("adminSidebar");

  if (!contenedorSidebar) return;

  if (!sesion) {
    contenedorSidebar.innerHTML = `
      <a class="admin-sidebar-marca" href="index.html">Tarot y Otras Artes</a>
      <p class="admin-sidebar-sub">Panel interno</p>
      <p class="admin-usuario-info">Sesión no iniciada.</p>
      <a class="admin-boton-salir" href="login.html">Iniciar sesión</a>
    `;
    return;
  }

  const rolConfig = ROLES_ADMIN[sesion.rol];
  const paginaActual = document.body.dataset.paginaAdmin || "";

  const menuItems = [];

  if (rolConfig.menuPermitido.includes("home")) {
    menuItems.push(
      construirEntradaMenu("home", "Panel", "admin.html", paginaActual === "home"),
    );
  }

  if (rolConfig.menuPermitido.includes("experiencias")) {
    menuItems.push(
      construirEntradaMenu(
        "experiencias",
        "Experiencias",
        "admin-experiencias.html",
        paginaActual === "experiencias",
      ),
    );
  }

  if (rolConfig.menuPermitido.includes("usuarios")) {
    menuItems.push(
      construirEntradaMenu(
        "usuarios",
        "Usuarios",
        "admin-usuarios.html",
        paginaActual === "usuarios",
      ),
    );
  }

  contenedorSidebar.innerHTML = `
    <a class="admin-sidebar-marca" href="admin.html">Tarot y Otras Artes</a>
    <p class="admin-sidebar-sub">Panel interno</p>

    <ul class="admin-menu">
      ${menuItems.join("")}
    </ul>

    <div class="admin-sidebar-pie">
      <p class="admin-usuario-info">
        <strong>${sesion.nombre || "Usuario"}</strong>
        ${rolConfig.nombreVisible}
      </p>
      <button class="admin-boton-salir" type="button" id="botonCerrarSesion">
        Cerrar sesión
      </button>
    </div>
  `;

  const botonCerrar = document.getElementById("botonCerrarSesion");

  if (botonCerrar) {
    botonCerrar.addEventListener("click", cerrarSesionAdmin);
  }
}

/**
 * Redirige al login si no hay sesión válida.
 * Se llama desde páginas protegidas.
 */
function exigirSesionAdmin() {
  const sesion = obtenerSesionAdmin();

  if (!sesion) {
    window.location.href = "login.html";
    return null;
  }

  return sesion;
}

/* Ejecutamos al cargar la página. */
renderizarSidebar();

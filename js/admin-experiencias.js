/**
 * Mantenedor de experiencias del panel admin.
 * Lee y escribe el arreglo "experienciasAdmin" en localStorage.
 * Si no existe, lo inicializa a partir de datos-experiencias.js.
 *
 * Funciona tanto en el listado (admin-experiencias.html)
 * como en el formulario (admin-experiencias-form.html).
 */

const CLAVE_EXPERIENCIAS_ADMIN = "experienciasAdmin";

/* ---------- Persistencia ---------- */
function leerExperienciasAdmin() {
  const guardadas = localStorage.getItem(CLAVE_EXPERIENCIAS_ADMIN);

  if (guardadas === null) {
    /* Primera vez: inicializamos con los datos semilla. */
    const semilla = experiencias.map((exp) => ({
      ...exp,
      estado: "publicado",
    }));
    localStorage.setItem(CLAVE_EXPERIENCIAS_ADMIN, JSON.stringify(semilla));
    return semilla;
  }

  try {
    const lista = JSON.parse(guardadas);
    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    return [];
  }
}

function guardarExperienciasAdmin(lista) {
  localStorage.setItem(CLAVE_EXPERIENCIAS_ADMIN, JSON.stringify(lista));
}

/* ---------- Listado ---------- */
function obtenerEtiquetaEstadoExperiencia(estado) {
  const mapa = {
    publicado: "Publicado",
    revision: "En revisión",
    borrador: "Borrador",
    archivado: "Archivado",
  };
  return mapa[estado] || estado;
}

function obtenerClaseEstadoExperiencia(estado) {
  const mapa = {
    publicado: "estado-publicado",
    revision: "estado-revision",
    borrador: "estado-borrador",
    archivado: "estado-archivado",
  };
  return mapa[estado] || "estado-borrador";
}

function formatearPrecioExperiencia(precio) {
  if (precio === 0) return "Gratuita";
  return `$${precio.toLocaleString("es-CL")}`;
}

function crearFilaExperiencia(exp) {
  return `
    <tr>
      <td><strong>${exp.nombre}</strong></td>
      <td>${exp.categoria}</td>
      <td>${formatearPrecioExperiencia(exp.precio)}</td>
      <td>
        <span class="badge ${obtenerClaseEstadoExperiencia(exp.estado || "publicado")}">
          ${obtenerEtiquetaEstadoExperiencia(exp.estado || "publicado")}
        </span>
      </td>
      <td class="text-end">
        <a
          class="btn btn-sm boton-admin-secundario"
          href="admin-experiencias-form.html?id=${exp.id}"
        >
          Editar
        </a>
        <button
          class="btn btn-sm btn-outline-danger"
          data-eliminar-experiencia="${exp.id}"
          type="button"
        >
          Eliminar
        </button>
      </td>
    </tr>
  `;
}

function configurarEliminarExperiencia() {
  document
    .querySelectorAll("[data-eliminar-experiencia]")
    .forEach((boton) => {
      boton.addEventListener("click", () => {
        const id = Number(boton.dataset.eliminarExperiencia);
        const lista = leerExperienciasAdmin();
        const filtrada = lista.filter((exp) => exp.id !== id);

        guardarExperienciasAdmin(filtrada);
        renderizarListadoExperiencias();

        const mensaje = document.getElementById("mensajeAdminExperiencias");
        if (mensaje) {
          mensaje.innerHTML = `
            <div class="alert alert-success mb-0" role="alert">
              Experiencia eliminada (modo simulado).
            </div>
          `;
        }
      });
    });
}

function renderizarListadoExperiencias() {
  const cuerpo = document.getElementById("cuerpoTablaExperiencias");

  if (!cuerpo) return;

  const lista = leerExperienciasAdmin();

  if (lista.length === 0) {
    cuerpo.innerHTML = `
      <tr>
        <td colspan="5" class="text-center py-4 text-muted">
          No hay experiencias registradas todavía.
        </td>
      </tr>
    `;
    return;
  }

  cuerpo.innerHTML = lista.map(crearFilaExperiencia).join("");
  configurarEliminarExperiencia();
}

/* ---------- Formulario ---------- */
function leerParametroId() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  return Number.isFinite(id) && id > 0 ? id : null;
}

function actualizarEstadoCampoAdmin(campo, contenedorMensaje, esValido, mensaje) {
  if (!campo || !contenedorMensaje) return;
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

function validarNombreExp() {
  const campo = document.getElementById("nombreExperiencia");
  const mensaje = document.getElementById("mensajeNombreExperiencia");
  const valor = campo.value.trim();
  const ok = valor.length > 0 && valor.length <= 100;
  actualizarEstadoCampoAdmin(
    campo,
    mensaje,
    ok,
    "El nombre es obligatorio (máx. 100 caracteres).",
  );
  return ok;
}

function validarCategoriaExp() {
  const campo = document.getElementById("categoriaExperiencia");
  const mensaje = document.getElementById("mensajeCategoriaExperiencia");
  const ok = campo.value !== "";
  actualizarEstadoCampoAdmin(campo, mensaje, ok, "Selecciona una categoría.");
  return ok;
}

function validarDescripcionExp() {
  const campo = document.getElementById("descripcionExperiencia");
  const mensaje = document.getElementById("mensajeDescripcionExperiencia");
  const valor = campo.value.trim();
  const ok = valor.length <= 500;
  actualizarEstadoCampoAdmin(
    campo,
    mensaje,
    ok,
    "La descripción no puede superar 500 caracteres.",
  );
  return ok;
}

function validarPrecioExp() {
  const campo = document.getElementById("precioExperiencia");
  const mensaje = document.getElementById("mensajePrecioExperiencia");
  const numero = Number(campo.value);
  const ok = campo.value !== "" && Number.isFinite(numero) && numero >= 0;
  actualizarEstadoCampoAdmin(
    campo,
    mensaje,
    ok,
    "El precio debe ser un número mayor o igual a 0.",
  );
  return ok;
}

function mostrarMensajeFormularioExp(tipo, texto) {
  const contenedor = document.getElementById("mensajeFormularioExperiencia");
  if (!contenedor) return;
  contenedor.innerHTML = `
    <div class="alert alert-${tipo} mb-0" role="alert">${texto}</div>
  `;
}

function cargarExperienciaEnFormulario(id) {
  if (!id) return;

  const lista = leerExperienciasAdmin();
  const exp = lista.find((e) => e.id === id);
  if (!exp) return;

  const titulo = document.getElementById("tituloFormulario");
  if (titulo) titulo.textContent = "Editar experiencia";

  document.getElementById("nombreExperiencia").value = exp.nombre || "";
  document.getElementById("categoriaExperiencia").value = exp.categoria || "";
  document.getElementById("descripcionExperiencia").value =
    exp.descripcion || "";
  document.getElementById("precioExperiencia").value = exp.precio ?? 0;
  document.getElementById("imagenExperiencia").value = exp.imagen || "";
  document.getElementById("estadoExperiencia").value =
    exp.estado || "publicado";
}

function configurarFormularioExperiencia() {
  const formulario = document.getElementById("formularioExperiencia");
  if (!formulario) return;

  const idActual = leerParametroId();
  cargarExperienciaEnFormulario(idActual);

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const vNombre = validarNombreExp();
    const vCategoria = validarCategoriaExp();
    const vDescripcion = validarDescripcionExp();
    const vPrecio = validarPrecioExp();

    if (!vNombre || !vCategoria || !vDescripcion || !vPrecio) {
      mostrarMensajeFormularioExp(
        "danger",
        "Revisa los campos marcados antes de guardar.",
      );
      return;
    }

    const lista = leerExperienciasAdmin();

    const datos = {
      nombre: document.getElementById("nombreExperiencia").value.trim(),
      categoria: document.getElementById("categoriaExperiencia").value,
      descripcion: document
        .getElementById("descripcionExperiencia")
        .value.trim(),
      precio: Number(document.getElementById("precioExperiencia").value),
      imagen:
        document.getElementById("imagenExperiencia").value.trim() ||
        "imagenes/00-el-loco.png",
      textoAlternativo: "Imagen de la experiencia",
      estado: document.getElementById("estadoExperiencia").value,
    };

    if (idActual) {
      /* Editar */
      const indice = lista.findIndex((e) => e.id === idActual);
      if (indice !== -1) {
        lista[indice] = { ...lista[indice], ...datos };
      }
    } else {
      /* Crear */
      const nuevoId =
        lista.length > 0 ? Math.max(...lista.map((e) => e.id)) + 1 : 1;
      lista.push({ id: nuevoId, ...datos });
    }

    guardarExperienciasAdmin(lista);
    mostrarMensajeFormularioExp("success", "Experiencia guardada (modo simulado).");

    setTimeout(() => {
      window.location.href = "admin-experiencias.html";
    }, 900);
  });

  /* Validación en vivo */
  document
    .getElementById("nombreExperiencia")
    .addEventListener("input", validarNombreExp);
  document
    .getElementById("categoriaExperiencia")
    .addEventListener("change", validarCategoriaExp);
  document
    .getElementById("descripcionExperiencia")
    .addEventListener("input", validarDescripcionExp);
  document
    .getElementById("precioExperiencia")
    .addEventListener("input", validarPrecioExp);
}

/* ---------- Arranque ---------- */
if (document.getElementById("cuerpoTablaExperiencias")) {
  renderizarListadoExperiencias();
}

if (document.getElementById("formularioExperiencia")) {
  configurarFormularioExperiencia();
}

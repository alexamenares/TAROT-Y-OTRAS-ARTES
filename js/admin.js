/**
 * Interacciones simuladas del panel administrativo.
 * Ninguna accion se guarda en servidor: solo se actualiza la pantalla actual.
 */
const mensajeAdmin = document.getElementById("mensajeAdmin");
const formularioAdmin = document.getElementById("formularioAdmin");
const campoTituloAdmin = document.getElementById("tituloAdmin");
const campoTipoAdmin = document.getElementById("tipoAdmin");
const mensajeTituloAdmin = document.getElementById("mensajeTituloAdmin");
const mensajeTipoAdmin = document.getElementById("mensajeTipoAdmin");
const contadorPublicadosAdmin = document.getElementById(
  "contadorPublicadosAdmin",
);
const cuerpoTablaAdmin = document.querySelector(".tabla-admin tbody");

function mostrarMensajeAdmin(tipo, mensaje) {
  mensajeAdmin.innerHTML = `
    <div class="alert alert-${tipo} mt-3 mb-0" role="alert">
      ${mensaje}
    </div>
  `;
}

function actualizarEstadoCampoAdmin(
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

function validarTituloAdmin() {
  const titulo = campoTituloAdmin.value.trim();
  const esValido = titulo.length >= 4 && titulo.length <= 80;

  actualizarEstadoCampoAdmin(
    campoTituloAdmin,
    mensajeTituloAdmin,
    esValido,
    "Ingresa un título entre 4 y 80 caracteres.",
  );

  return esValido;
}

function validarTipoAdmin() {
  const esValido = campoTipoAdmin.value !== "";

  actualizarEstadoCampoAdmin(
    campoTipoAdmin,
    mensajeTipoAdmin,
    esValido,
    "Selecciona un tipo de contenido.",
  );

  return esValido;
}

function actualizarContadorPublicados() {
  const elementosPublicados = document.querySelectorAll(".estado-publicado");
  contadorPublicadosAdmin.textContent = String(elementosPublicados.length);
}

/**
 * Cambia el estado visual de una fila y reemplaza el boton disponible.
 */
function cambiarEstadoFila(boton, textoEstado, claseEstado, textoAccion) {
  const fila = boton.closest("tr");
  const etiquetaEstado = fila.querySelector(".badge");

  etiquetaEstado.className = `badge ${claseEstado}`;
  etiquetaEstado.textContent = textoEstado;
  boton.textContent = textoAccion;

  if (claseEstado === "estado-publicado") {
    boton.className = "btn btn-sm btn-outline-secondary boton-admin-revision";
    mostrarMensajeAdmin("success", "Contenido publicado en modo simulado.");
  } else {
    boton.className = "btn btn-sm btn-experiencia boton-admin-publicar";
    mostrarMensajeAdmin("warning", "Contenido enviado a revisión simulada.");
  }

  actualizarContadorPublicados();
}

function configurarBotonAdmin(boton) {
  boton.addEventListener("click", () => {
    if (boton.classList.contains("boton-admin-publicar")) {
      cambiarEstadoFila(boton, "Publicado", "estado-publicado", "Enviar a revisión");
      return;
    }

    cambiarEstadoFila(boton, "En revisión", "estado-revision", "Publicar");
  });
}

function crearFilaBorrador(titulo, tipo) {
  const fila = document.createElement("tr");

  const celdaTitulo = document.createElement("td");
  const celdaTipo = document.createElement("td");
  const celdaEstado = document.createElement("td");
  const celdaAccion = document.createElement("td");
  const etiquetaEstado = document.createElement("span");
  const botonPublicar = document.createElement("button");

  celdaTitulo.textContent = titulo;
  celdaTipo.textContent = tipo;

  etiquetaEstado.className = "badge estado-borrador";
  etiquetaEstado.textContent = "Borrador";
  celdaEstado.appendChild(etiquetaEstado);

  botonPublicar.className = "btn btn-sm btn-experiencia boton-admin-publicar";
  botonPublicar.type = "button";
  botonPublicar.textContent = "Publicar";
  celdaAccion.appendChild(botonPublicar);

  fila.append(celdaTitulo, celdaTipo, celdaEstado, celdaAccion);
  configurarBotonAdmin(botonPublicar);

  cuerpoTablaAdmin.appendChild(fila);
}

function limpiarFormularioAdmin() {
  formularioAdmin.reset();
  campoTituloAdmin.classList.remove("is-valid", "is-invalid");
  campoTipoAdmin.classList.remove("is-valid", "is-invalid");
  mensajeTituloAdmin.textContent = "";
  mensajeTipoAdmin.textContent = "";
}

document
  .querySelectorAll(".boton-admin-publicar, .boton-admin-revision")
  .forEach(configurarBotonAdmin);

actualizarContadorPublicados();

campoTituloAdmin.addEventListener("input", validarTituloAdmin);
campoTipoAdmin.addEventListener("change", validarTipoAdmin);

formularioAdmin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const tituloEsValido = validarTituloAdmin();
  const tipoEsValido = validarTipoAdmin();

  const formularioEsValido = tituloEsValido && tipoEsValido;

  if (!formularioEsValido) {
    mostrarMensajeAdmin(
      "danger",
      "Revisa los campos antes de crear el borrador simulado.",
    );
    return;
  }

  crearFilaBorrador(campoTituloAdmin.value.trim(), campoTipoAdmin.value);
  mostrarMensajeAdmin("success", "Borrador agregado a la tabla simulada.");
  limpiarFormularioAdmin();
});

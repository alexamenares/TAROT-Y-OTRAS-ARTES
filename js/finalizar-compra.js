/**
 * Controlador del checkout simulado.
 *
 * Usa una fotografía del carrito al abrir la página. Así el resumen, la
 * validación y el pedido que se guarda representan exactamente lo que la
 * persona decidió comprar antes de confirmar.
 */
const lineasCheckout = window.CarritoTarot.obtenerLineas();
const formularioCheckout = document.getElementById("formularioCheckout");
const seccionEntrega = document.getElementById("seccionEntrega");
const camposDireccion = document.getElementById("camposDireccion");
const resumenCheckout = document.getElementById("resumenCheckout");
const tieneProductos = window.CarritoTarot.contieneProductos(lineasCheckout);
const comunasPorRegion = {
  Metropolitana: ["Santiago", "Providencia", "Maipú"],
  Valparaíso: ["Valparaíso", "Viña del Mar", "Quilpué"],
  Biobío: ["Concepción", "Talcahuano", "Los Ángeles"],
};

/** Evita repetir la limpieza de espacios al leer un campo del formulario. */
function obtenerValor(id) {
  return String(document.getElementById(id)?.value || "").trim();
}

/**
 * Muestra u oculta el mensaje ligado a un campo y actualiza aria-invalid para
 * que tecnologías de asistencia también perciban el problema.
 */
function establecerError(id, mensaje) {
  const campo = document.getElementById(id);
  const ayuda = document.querySelector(`[data-error="${id}"]`);
  campo?.classList.toggle("campo-checkout-error", Boolean(mensaje));
  campo?.setAttribute("aria-invalid", String(Boolean(mensaje)));
  if (ayuda) ayuda.textContent = mensaje;
}

/** Carga comunas simuladas solo para la región seleccionada. */
function actualizarComunas() {
  const region = obtenerValor("regionEntrega");
  const comuna = document.getElementById("comunaEntrega");
  comuna.innerHTML = `<option value="">Selecciona una comuna</option>${(comunasPorRegion[region] || []).map((nombre) => `<option value="${nombre}">${nombre}</option>`).join("")}`;
}

/**
 * Las experiencias digitales no requieren despacho: por esa razón su tipo de
 * entrega se fija en “Digital” aunque no exista un radio seleccionado.
 */
function obtenerTipoEntrega() {
  if (!tieneProductos) return "Digital";
  return document.querySelector('input[name="tipoEntrega"]:checked')?.value || "Retiro";
}

/**
 * Ajusta el formulario al método elegido. Ocultar y deshabilitar dirección
 * evita exigir datos innecesarios cuando se selecciona retiro o una compra
 * contiene solo productos digitales.
 */
function actualizarEntrega() {
  const requiereDireccion = tieneProductos && obtenerTipoEntrega() === "Despacho";
  camposDireccion.hidden = !requiereDireccion;
  camposDireccion.querySelectorAll("select, input").forEach((campo) => {
    campo.disabled = !requiereDireccion;
  });
  if (!requiereDireccion) {
    ["regionEntrega", "comunaEntrega", "direccionEntrega"].forEach((id) => establecerError(id, ""));
  }
  mostrarResumen();
}

/** Recalcula el resumen cada vez que el método de entrega puede alterar el total. */
function mostrarResumen() {
  const subtotal = window.CarritoTarot.calcularSubtotal(lineasCheckout);
  const despacho = obtenerTipoEntrega() === "Despacho" ? 3990 : 0;
  resumenCheckout.innerHTML = `
    <h2>Resumen del pedido</h2>
    <ul class="lista-resumen-checkout">
      ${lineasCheckout.map((linea) => `<li><span>${linea.nombre} × ${linea.cantidad}</span><strong>${window.CarritoTarot.formatearPrecio(linea.precio * linea.cantidad)}</strong></li>`).join("")}
    </ul>
    <dl><div><dt>Subtotal</dt><dd>${window.CarritoTarot.formatearPrecio(subtotal)}</dd></div><div><dt>Despacho</dt><dd>${window.CarritoTarot.formatearPrecio(despacho)}</dd></div><div class="fila-total"><dt>Total</dt><dd>${window.CarritoTarot.formatearPrecio(subtotal + despacho)}</dd></div></dl>
  `;
}

/**
 * Reúne los errores antes de continuar. Solo los datos indispensables para el
 * tipo de compra se validan; la referencia de dirección es intencionalmente
 * opcional.
 */
function validarFormulario() {
  const errores = {};
  const nombre = obtenerValor("nombreCompra");
  const correo = obtenerValor("correoCompra");
  if (nombre.length < 3) errores.nombreCompra = "Escribe un nombre de al menos 3 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) errores.correoCompra = "Ingresa un correo válido.";

  if (tieneProductos && obtenerTipoEntrega() === "Despacho") {
    if (!obtenerValor("regionEntrega")) errores.regionEntrega = "Selecciona una región.";
    if (!obtenerValor("comunaEntrega")) errores.comunaEntrega = "Selecciona una comuna.";
    if (obtenerValor("direccionEntrega").length < 5) errores.direccionEntrega = "Escribe una dirección de al menos 5 caracteres.";
  }

  ["nombreCompra", "correoCompra", "regionEntrega", "comunaEntrega", "direccionEntrega"].forEach((id) => establecerError(id, errores[id] || ""));
  const primerError = Object.keys(errores)[0];
  document.getElementById(primerError)?.focus();
  return Object.keys(errores).length === 0;
}

// La validación inmediata orienta a la persona sin esperar al envío completo.
function validarCampoEnTiempoReal(evento) {
  const campo = evento.currentTarget;
  const valor = String(campo.value || "").trim();
  if (campo.id === "nombreCompra") {
    establecerError(campo.id, valor.length >= 3 ? "" : "Escribe un nombre de al menos 3 caracteres.");
  }
  if (campo.id === "correoCompra") {
    establecerError(campo.id, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ? "" : "Ingresa un correo válido.");
  }
  if (campo.id === "direccionEntrega" && obtenerTipoEntrega() === "Despacho") {
    establecerError(campo.id, valor.length >= 5 ? "" : "Escribe una dirección de al menos 5 caracteres.");
  }
}

/**
 * Construye un identificador local legible. No es un folio tributario ni una
 * venta real; solo permite demostrar el cierre del flujo en este MVP.
 */
function crearNumeroPedido(historial) {
  const fecha = new Date();
  const compacta = `${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, "0")}${String(fecha.getDate()).padStart(2, "0")}`;
  return `TOA-${compacta}-${String(historial.length + 1).padStart(4, "0")}`;
}

/**
 * Finaliza la simulación: valida, guarda una copia en el historial local,
 * conserva el último pedido para la página siguiente y recién entonces vacía
 * el carrito.
 */
function confirmarCompra() {
  if (!validarFormulario()) return;
  const subtotal = window.CarritoTarot.calcularSubtotal(lineasCheckout);
  const tipoEntrega = obtenerTipoEntrega();
  const despacho = tipoEntrega === "Despacho" ? 3990 : 0;
  let historial = [];
  try {
    historial = JSON.parse(localStorage.getItem("tarot-historial-pedidos") || "[]");
    if (!Array.isArray(historial)) historial = [];
  } catch (error) {
    historial = [];
  }

  const pedido = {
    numero: crearNumeroPedido(historial),
    fecha: new Date().toISOString(),
    cliente: { nombre: obtenerValor("nombreCompra"), correo: obtenerValor("correoCompra") },
    entrega: {
      tipo: tipoEntrega,
      region: obtenerValor("regionEntrega"),
      comuna: obtenerValor("comunaEntrega"),
      direccion: obtenerValor("direccionEntrega"),
      referencia: obtenerValor("referenciaEntrega"),
    },
    lineas: lineasCheckout,
    subtotal,
    despacho,
    total: subtotal + despacho,
  };

  historial.push(pedido);
  localStorage.setItem("tarot-historial-pedidos", JSON.stringify(historial));
  localStorage.setItem("tarot-ultimo-pedido", JSON.stringify(pedido));
  window.CarritoTarot.vaciar();
  window.location.assign("pedido-confirmado.html");
}

if (lineasCheckout.length === 0) {
  formularioCheckout.innerHTML = `<div class="alert alert-warning" role="alert">No hay elementos para finalizar. <a class="alert-link" href="carrito.html">Volver al carrito</a></div>`;
  resumenCheckout.hidden = true;
} else {
  seccionEntrega.hidden = !tieneProductos;
  if (!tieneProductos) document.getElementById("avisoEntregaDigital").hidden = false;
  document.getElementById("regionEntrega").addEventListener("change", (evento) => {
    actualizarComunas();
    establecerError("regionEntrega", evento.currentTarget.value ? "" : "Selecciona una región.");
  });
  document.getElementById("comunaEntrega").addEventListener("change", (evento) => {
    establecerError("comunaEntrega", evento.currentTarget.value ? "" : "Selecciona una comuna.");
  });
  ["nombreCompra", "correoCompra", "direccionEntrega"].forEach((id) => {
    document.getElementById(id).addEventListener("input", validarCampoEnTiempoReal);
  });
  document.querySelectorAll('input[name="tipoEntrega"]').forEach((radio) => radio.addEventListener("change", actualizarEntrega));
  formularioCheckout.addEventListener("submit", (evento) => {
    evento.preventDefault();
    confirmarCompra();
  });
  actualizarEntrega();
}

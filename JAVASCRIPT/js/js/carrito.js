const CARRITO_KEY = "tarot_carrito";

const getCarrito = () => JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
const setCarrito = (c) => {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(c));
  actualizarContador();
};

function agregarAlCarrito(id, cantidad = 1) {
  const carrito = getCarrito();
  const item = carrito.find(x => x.id === id);
  if (item) item.cantidad += cantidad;
  else carrito.push({ id, cantidad });
  setCarrito(carrito);
  alert("Producto añadido al carrito 🛒");
}

function eliminarDelCarrito(id) {
  setCarrito(getCarrito().filter(x => x.id !== id));
  renderCarrito();
}

function cambiarCantidad(id, delta) {
  const carrito = getCarrito();
  const item = carrito.find(x => x.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) return eliminarDelCarrito(id);
  setCarrito(carrito);
  renderCarrito();
}

function actualizarContador() {
  const total = getCarrito().reduce((s, i) => s + i.cantidad, 0);
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = total);
}

function renderCarrito() {
  const tbody = document.getElementById("carrito-body");
  if (!tbody) return;
  const carrito = getCarrito();
  const vacio = document.getElementById("carrito-vacio");
  const tabla = document.getElementById("tabla-carrito");

  if (carrito.length === 0) {
    vacio.classList.remove("hidden");
    tabla.classList.add("hidden");
    return;
  }
  vacio.classList.add("hidden");
  tabla.classList.remove("hidden");

  tbody.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    const p = PRODUCTOS.find(x => x.id === item.id);
    if (!p) return;
    const sub = p.precio * item.cantidad;
    total += sub;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.nombre}</td>
      <td>${formatearPrecio(p.precio)}</td>
      <td>
        <button onclick="cambiarCantidad(${p.id}, -1)">−</button>
        ${item.cantidad}
        <button onclick="cambiarCantidad(${p.id}, 1)">+</button>
      </td>
      <td>${formatearPrecio(sub)}</td>
      <td><button onclick="eliminarDelCarrito(${p.id})">🗑</button></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById("total-carrito").textContent = formatearPrecio(total);
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();
  renderCarrito();
  const btn = document.getElementById("btn-pagar");
  if (btn) btn.addEventListener("click", () => {
    if (getCarrito().length === 0) return alert("El carrito está vacío");
    alert("Compra realizada con éxito. ¡Gracias!");
    setCarrito([]);
    renderCarrito();
  });
});
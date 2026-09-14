const PRODUCTOS = [
  { id: 1, nombre: "Mazo Tarot Rider-Waite", precio: 19990, categoria: "tarot", img: "img/tarot-rider.jpg", desc: "Mazo clásico de 78 cartas con guía ilustrada." },
  { id: 2, nombre: "Mazo Tarot de Marsella", precio: 22990, categoria: "tarot", img: "img/tarot-marsella.jpg", desc: "Edición tradicional restaurada." },
  { id: 3, nombre: "Runas Nórdicas (set 24)", precio: 17990, categoria: "tarot", img: "img/runas.jpg", desc: "Piedras grabadas con símbolos del Elder Futhark." },
  { id: 4, nombre: "Péndulo de cuarzo", precio: 15990, categoria: "cristales", img: "img/pendulo.jpg", desc: "Cuarzo natural con cadena de plata." },
  { id: 5, nombre: "Amatista (pieza)", precio: 12990, categoria: "cristales", img: "img/amatista.jpg", desc: "Drusa de amatista para meditación." },
  { id: 6, nombre: "Cuarzo rosa (rodado)", precio: 8990, categoria: "cristales", img: "img/cuarzo-rosa.jpg", desc: "Piedra pulida para armonización." },
  { id: 7, nombre: "Set 5 velas rituales", precio: 8990, categoria: "velas", img: "img/velas.jpg", desc: "Velas de colores para rituales." },
  { id: 8, nombre: "Incienso de sándalo", precio: 4990, categoria: "velas", img: "img/incienso.jpg", desc: "Caja de 20 varillas aromáticas." },
  { id: 9, nombre: "Sahumerio de hierbas", precio: 6990, categoria: "velas", img: "img/sahumerio.jpg", desc: "Mezcla de hierbas para limpieza energética." },
  { id: 10, nombre: "Lectura de Tarot (3 cartas)", precio: 9990, categoria: "servicios", img: "img/lectura-tarot.jpg", desc: "Sesión online de 30 min con profesional verificado." },
  { id: 11, nombre: "Lectura de Runas (5 runas)", precio: 12990, categoria: "servicios", img: "img/lectura-runas.jpg", desc: "Sesión personalizada de 40 min." },
  { id: 12, nombre: "Curso básico de Tarot", precio: 39990, categoria: "servicios", img: "img/curso-tarot.jpg", desc: "Curso online de 8 semanas." }
];

// Formato moneda CLP
const formatearPrecio = (v) => "$" + v.toLocaleString("es-CL");

// Render genérico de tarjetas
function renderProductos(lista, contenedorId) {
  const cont = document.getElementById(contenedorId);
  if (!cont) return;
  cont.innerHTML = "";
  if (lista.length === 0) {
    cont.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }
  lista.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <div class="info">
        <h3>${p.nombre}</h3>
        <p class="precio">${formatearPrecio(p.precio)}</p>
        <a href="detalle-producto.html?id=${p.id}" class="btn-primary">Ver detalle</a>
        <button class="btn-primary" onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
      </div>`;
    cont.appendChild(card);
  });
}

// Home: destacados
if (document.getElementById("lista-destacados")) {
  renderProductos(PRODUCTOS.slice(0, 4), "lista-destacados");
}

// Catálogo con filtros
if (document.getElementById("lista-productos")) {
  const renderFiltrado = () => {
    const q = document.getElementById("buscar").value.toLowerCase();
    const cat = document.getElementById("filtro-categoria").value;
    const filtrados = PRODUCTOS.filter(p =>
      (!cat || p.categoria === cat) &&
      (!q || p.nombre.toLowerCase().includes(q))
    );
    renderProductos(filtrados, "lista-productos");
  };
  document.getElementById("buscar").addEventListener("input", renderFiltrado);
  document.getElementById("filtro-categoria").addEventListener("change", renderFiltrado);
  renderProductos(PRODUCTOS, "lista-productos");
}

// Detalle producto
if (document.getElementById("detalle-producto")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const p = PRODUCTOS.find(x => x.id === id);
  const cont = document.getElementById("detalle-producto");
  if (!p) {
    cont.innerHTML = "<p>Producto no encontrado.</p>";
  } else {
    document.getElementById("breadcrumb-nombre").textContent = p.nombre;
    cont.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <div class="info">
        <h1>${p.nombre}</h1>
        <p class="precio">${formatearPrecio(p.precio)}</p>
        <p>${p.desc}</p>
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" value="1" min="1" style="width:80px; padding:.4rem;">
        <button class="btn-primary" onclick="agregarAlCarrito(${p.id}, parseInt(document.getElementById('cantidad').value))">Añadir al carrito</button>
      </div>`;
    // Relacionados: misma categoría, sin el actual, máx 4
    const rel = PRODUCTOS.filter(x => x.categoria === p.categoria && x.id !== p.id).slice(0, 4);
    renderProductos(rel, "lista-relacionados");
  }
}
/**
 * Servicio compartido del carrito único.
 *
 * Este archivo concentra las reglas de negocio que todas las pantallas deben
 * respetar: añadir elementos, modificar cantidades, no sobrepasar el stock y
 * calcular totales. Las páginas no manipulan localStorage directamente; en su
 * lugar llaman a window.CarritoTarot. Así evitamos que Tienda, Experiencias y
 * Carrito terminen aplicando reglas distintas al mismo dato.
 */
(function crearServicioCarrito() {
  const CLAVE_CARRITO = "tarot-carrito";
  const CLAVE_MIGRACION = "tarot-carrito-migrado-v4";

  /**
   * Lee un valor guardado en el navegador sin detener el sitio si el dato fue
   * eliminado o quedó mal escrito. En ese caso se devuelve un respaldo seguro.
   */
  function leerJson(clave, respaldo) {
    try {
      const valor = localStorage.getItem(clave);
      return valor === null ? respaldo : JSON.parse(valor);
    } catch (error) {
      return respaldo;
    }
  }

  /**
   * Convierte cualquier dato recibido a la forma mínima válida del carrito.
   * Además limita la cantidad al stock en productos físicos. Las experiencias
   * no tienen stock porque representan acceso digital simulado.
   */
  function normalizarLinea(linea) {
    const cantidad = Math.max(1, Number.parseInt(linea.cantidad, 10) || 1);
    const stock = linea.tipo === "producto"
      ? Math.max(0, Number.parseInt(linea.stock, 10) || 0)
      : null;

    return {
      tipo: linea.tipo === "producto" ? "producto" : "experiencia",
      id: linea.id,
      nombre: String(linea.nombre || "Elemento sin nombre"),
      precio: Math.max(0, Number(linea.precio) || 0),
      cantidad: stock === null ? cantidad : Math.min(cantidad, stock),
      imagen: String(linea.imagen || ""),
      alt: String(linea.alt || linea.textoAlternativo || linea.nombre || ""),
      stock,
    };
  }

  /** Entrega una copia limpia de las líneas disponibles para renderizar. */
  function obtenerLineas() {
    const lineas = leerJson(CLAVE_CARRITO, []);
    return Array.isArray(lineas)
      ? lineas.map(normalizarLinea).filter((linea) => linea.cantidad > 0)
      : [];
  }

  /**
   * Comunica a otras páginas/componentes que el carrito cambió. El encabezado
   * escucha este evento para actualizar el badge sin recargar la página.
   */
  function anunciarCambio(lineas) {
    window.dispatchEvent(new CustomEvent("carrito-actualizado", { detail: { lineas } }));
  }

  /** Guarda solo datos normalizados y luego dispara la actualización visual. */
  function guardarLineas(lineas) {
    const lineasNormalizadas = lineas.map(normalizarLinea);
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(lineasNormalizadas));
    anunciarCambio(lineasNormalizadas);
    return lineasNormalizadas;
  }

  /** Busca una línea por tipo e id para que el mismo elemento no se duplique. */
  function buscarIndice(lineas, tipo, id) {
    return lineas.findIndex(
      (linea) => linea.tipo === tipo && String(linea.id) === String(id),
    );
  }

  /**
   * Añade una unidad o aumenta una línea existente. Antes de guardar valida el
   * stock; por eso una página puede mostrar el mensaje devuelto sin repetir la
   * misma validación.
   */
  function agregar(elemento, cantidad = 1) {
    const lineas = obtenerLineas();
    const nuevaLinea = normalizarLinea({ ...elemento, cantidad });
    const indice = buscarIndice(lineas, nuevaLinea.tipo, nuevaLinea.id);

    if (nuevaLinea.tipo === "producto" && nuevaLinea.stock < 1) {
      return { exito: false, mensaje: "Este producto no tiene stock disponible." };
    }

    if (indice >= 0) {
      const cantidadSolicitada = lineas[indice].cantidad + nuevaLinea.cantidad;
      if (lineas[indice].tipo === "producto" && cantidadSolicitada > lineas[indice].stock) {
        return { exito: false, mensaje: `Solo hay ${lineas[indice].stock} unidades disponibles.` };
      }
      lineas[indice].cantidad = cantidadSolicitada;
      guardarLineas(lineas);
      return { exito: true, mensaje: `Aumentamos la cantidad de ${nuevaLinea.nombre}.` };
    }

    guardarLineas([...lineas, nuevaLinea]);
    return { exito: true, mensaje: `${nuevaLinea.nombre} fue agregado al carrito.` };
  }

  /** Cambia la cantidad desde los controles + y − del carrito. */
  function actualizarCantidad(tipo, id, cantidad) {
    const lineas = obtenerLineas();
    const indice = buscarIndice(lineas, tipo, id);
    if (indice < 0) {
      return { exito: false, mensaje: "El elemento ya no está en el carrito." };
    }

    const cantidadNueva = Math.max(1, Number.parseInt(cantidad, 10) || 1);
    const linea = lineas[indice];
    if (linea.tipo === "producto" && cantidadNueva > linea.stock) {
      return { exito: false, mensaje: `El stock máximo disponible es ${linea.stock}.` };
    }

    linea.cantidad = cantidadNueva;
    guardarLineas(lineas);
    return { exito: true, mensaje: "Cantidad actualizada." };
  }

  /** Elimina una línea completa; la confirmación ocurre en la interfaz. */
  function quitar(tipo, id) {
    guardarLineas(
      obtenerLineas().filter(
        (linea) => !(linea.tipo === tipo && String(linea.id) === String(id)),
      ),
    );
  }

  /** Se usa al confirmar una compra simulada para dejar el carrito disponible. */
  function vaciar() {
    guardarLineas([]);
  }

  function obtenerCantidadUnidades() {
    return obtenerLineas().reduce((total, linea) => total + linea.cantidad, 0);
  }

  /** Suma precio por cantidad; no incluye despacho, que depende del checkout. */
  function calcularSubtotal(lineas = obtenerLineas()) {
    return lineas.reduce((total, linea) => total + linea.precio * linea.cantidad, 0);
  }

  function contieneProductos(lineas = obtenerLineas()) {
    return lineas.some((linea) => linea.tipo === "producto");
  }

  function formatearPrecio(valor) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(valor);
  }

  /**
   * Migra una sola vez las experiencias pagadas de la antigua “Mi selección”.
   * Esto protege a quien ya tenía datos en la versión anterior y después deja
   * una marca para que nunca se copie dos veces el mismo contenido.
   */
  function migrarSeleccionAnterior() {
    if (localStorage.getItem(CLAVE_MIGRACION) === "1") return;
    const seleccionAnterior = leerJson("seleccionExperiencias", []);

    if (obtenerLineas().length === 0 && Array.isArray(seleccionAnterior)) {
      const experienciasPagadas = seleccionAnterior
        .filter((experiencia) => Number(experiencia.precio) > 0)
        .map((experiencia) => ({
          tipo: "experiencia",
          id: experiencia.id,
          nombre: experiencia.nombre,
          precio: experiencia.precio,
          cantidad: 1,
          imagen: experiencia.imagen,
          alt: experiencia.textoAlternativo,
          stock: null,
        }));
      if (experienciasPagadas.length > 0) guardarLineas(experienciasPagadas);
    }

    localStorage.removeItem("seleccionExperiencias");
    localStorage.setItem(CLAVE_MIGRACION, "1");
  }

  window.CarritoTarot = {
    CLAVE_CARRITO,
    actualizarCantidad,
    agregar,
    calcularSubtotal,
    contieneProductos,
    formatearPrecio,
    guardarLineas,
    obtenerCantidadUnidades,
    obtenerLineas,
    quitar,
    vaciar,
  };

  migrarSeleccionAnterior();
})();

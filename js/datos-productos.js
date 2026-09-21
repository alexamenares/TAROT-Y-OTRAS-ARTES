/**
 * Catálogo simulado de productos físicos.
 *
 * Funciona como una base de datos temporal: Tienda, detalle y carrito leen la
 * misma fuente. Para sumar un producto futuro basta con agregar un objeto
 * completo y su imagen. El stock es solo una regla de simulación local; no
 * reserva existencias reales.
 */
const productos = [
  { id: "mazo-clasico", nombre: "Mazo clásico de Tarot", categoria: "Mazos, oráculos y runas", precio: 24990, stock: 8, descripcion: "Mazo de 78 cartas inspirado en la tradición Rider-Waite, ideal para estudio y práctica personal.", imagen: "imagenes/productos/mazo-clasico-tarot.png", alt: "Mazo clásico de Tarot con cartas ilustradas" },
  { id: "oraculo-simbolos", nombre: "Oráculo de símbolos", categoria: "Mazos, oráculos y runas", precio: 21990, stock: 6, descripcion: "Cartas de consulta con símbolos arquetípicos para acompañar preguntas, escritura y reflexión.", imagen: "imagenes/productos/oraculo-simbolos.png", alt: "Oráculo de símbolos en su caja protectora" },
  { id: "set-runas", nombre: "Set de runas", categoria: "Mazos, oráculos y runas", precio: 18990, stock: 10, descripcion: "Conjunto de runas grabadas con bolsa de guarda para prácticas simbólicas y contemplativas.", imagen: "imagenes/productos/set-runas.png", alt: "Set de runas grabadas con bolsa de tela" },
  { id: "guia-arcanos", nombre: "Guía de Arcanos Mayores", categoria: "Libros y guías", precio: 12990, stock: 12, descripcion: "Guía breve para reconocer los símbolos y preguntas centrales de los 22 Arcanos Mayores.", imagen: "imagenes/productos/guia-arcanos-mayores.png", alt: "Libro Guía de Arcanos Mayores" },
  { id: "introduccion-tarot", nombre: "Introducción al Tarot", categoria: "Libros y guías", precio: 16990, stock: 7, descripcion: "Libro de iniciación con ejercicios de observación, tiradas simples y registro personal.", imagen: "imagenes/productos/introduccion-tarot.png", alt: "Libro Introducción al Tarot" },
  { id: "pano-lecturas", nombre: "Paño para lecturas", categoria: "Accesorios rituales", precio: 9990, stock: 15, descripcion: "Paño suave de formato amplio para proteger las cartas y delimitar el espacio de lectura.", imagen: "imagenes/productos/pano-lecturas.png", alt: "Paño oscuro preparado para una lectura de Tarot" },
  { id: "bolsa-mazo", nombre: "Bolsa protectora para mazo", categoria: "Accesorios rituales", precio: 8990, stock: 12, descripcion: "Bolsa de tela acolchada para mantener el mazo protegido durante el guardado y traslado.", imagen: "imagenes/productos/bolsa-protectora-mazo.png", alt: "Bolsa protectora de tela para un mazo de Tarot" },
  { id: "sahumerio-herbal", nombre: "Sahumerio herbal", categoria: "Aromas, gemas y bienestar", precio: 5990, stock: 20, descripcion: "Mezcla herbal aromática para acompañar pausas, lecturas y momentos de concentración.", imagen: "imagenes/productos/sahumerio-herbal.png", alt: "Sahumerio herbal preparado con hierbas secas" },
  { id: "incienso-ritual", nombre: "Incienso ritual", categoria: "Aromas, gemas y bienestar", precio: 4990, stock: 24, descripcion: "Varillas de incienso de aroma cálido para crear un ambiente sereno antes de la práctica.", imagen: "imagenes/productos/incienso-ritual.png", alt: "Incienso ritual junto a su soporte" },
  { id: "amatista", nombre: "Amatista", categoria: "Aromas, gemas y bienestar", precio: 7990, stock: 14, descripcion: "Pieza decorativa de amatista seleccionada para espacios personales de calma y observación.", imagen: "imagenes/productos/amatista.png", alt: "Pieza natural de amatista violeta" },
  { id: "gemas-chakras", nombre: "Set de gemas para los 7 chakras", categoria: "Aromas, gemas y bienestar", precio: 19990, stock: 9, descripcion: "Selección de siete gemas de colores presentada como recurso simbólico de bienestar.", imagen: "imagenes/productos/set-gemas-7-chakras.png", alt: "Set de siete gemas de distintos colores" },
];

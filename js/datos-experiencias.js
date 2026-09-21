/**
 * Datos simulados del catálogo de experiencias.
 *
 * En este MVP no se consulta el backend. Más adelante este arreglo podrá ser
 * reemplazado por una respuesta de API sin rehacer las tarjetas ni el detalle.
 * El precio 0 tiene significado funcional: inicia directamente “Una carta”;
 * cualquier precio mayor a 0 corresponde a una experiencia que puede ir al
 * carrito único.
 */
const experiencias = [
  {
    id: 1,
    categoria: "TIRADA DE TAROT",
    nombre: "Una carta",
    descripcion:
      "Recibe un símbolo y una reflexión breve para acompañar tu día.",
    precio: 0,
    imagen: "imagenes/00-el-loco.png",
    textoAlternativo: "Carta de Tarot El Loco",
  },
  {
    id: 2,
    categoria: "LECTURA GUIADA",
    nombre: "Tres cartas",
    descripcion:
      "Explora pasado, presente y futuro mediante una tirada clásica.",
    precio: 2990,
    imagen: "imagenes/27-seis-de-bastos.png",
    textoAlternativo: "Carta de Tarot Seis de Bastos",
  },
  {
    id: 3,
    categoria: "MEDITACIÓN",
    nombre: "Sanar y soltar",
    descripcion:
      "Una experiencia guiada para observar emociones y recuperar calma.",
    precio: 1990,
    imagen: "imagenes/52-tres-de-espadas.png",
    textoAlternativo: "Carta de Tarot Tres de Espadas",
  },
];

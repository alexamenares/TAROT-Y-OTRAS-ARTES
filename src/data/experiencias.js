/**
 * CATÁLOGO LOCAL · Fuente compartida por portada, listado y detalles.
 * Cada id es estable y también identifica la línea del carrito.
 * precio está expresado en CLP; cero activa el flujo gratuito.
 * Los precios/duraciones nuevos son valores de demostración ajustables aquí.
 */
const experiencias = [
  {
    id: "1",
    categoria: "Tirada de Tarot",
    nombre: "Una carta",
    descripcion:
      "Recibe un símbolo y una reflexión breve para acompañar tu día.",
    detalle:
      "Una pausa breve para observar una carta, reconocer sus símbolos y llevar una pregunta clara a tu jornada.",
    precio: 0,
    duracion: "5 minutos",
    imagen: "/imagenes/00-el-loco.png",
    alt: "Carta de Tarot El Loco",
  },
  {
    id: "2",
    categoria: "Lectura guiada",
    nombre: "Tres cartas",
    descripcion:
      "Explora pasado, presente y futuro mediante una tirada clásica.",
    detalle:
      "Una lectura guiada que propone tres posiciones y preguntas concretas para mirar tu proceso con perspectiva.",
    precio: 2990,
    duracion: "20 minutos",
    imagen: "/imagenes/27-seis-de-bastos.png",
    alt: "Carta de Tarot Seis de Bastos",
  },
  {
    id: "3",
    categoria: "Meditación",
    nombre: "Sanar y soltar",
    descripcion:
      "Una experiencia guiada para observar emociones y recuperar calma.",
    detalle:
      "Una práctica pausada de respiración, observación simbólica y escritura para cerrar ciclos con amabilidad.",
    precio: 1990,
    duracion: "15 minutos",
    imagen: "/imagenes/52-tres-de-espadas.png",
    alt: "Carta de Tarot Tres de Espadas",
  },
  // Nuevas experiencias: valores y duraciones de demostración editables aquí.
  // El catálogo, los detalles y el carrito consumen este mismo arreglo.
  {
    id: "4",
    categoria: "Terapia complementaria",
    nombre: "Terapia con la cruz ankh",
    descripcion:
      "Una pausa de relajación y reflexión acompañada por el simbolismo de la cruz ankh.",
    detalle:
      "Sesión guiada de respiración, atención corporal y reflexión con la cruz ankh como objeto simbólico. La práctica propone un espacio personal de calma y no promete efectos curativos.",
    precio: 4990,
    duracion: "30 minutos",
    imagen: "/imagenes/experiencia-cruz-ankh.png",
    alt: "Cruz ankh de bronce sobre terciopelo violeta y madera oscura",
  },
  {
    id: "5",
    categoria: "Péndulo",
    nombre: "Preguntas sí o no con péndulo",
    descripcion:
      "Explora una pregunta concreta mediante una práctica simbólica con el péndulo.",
    detalle:
      "Una experiencia guiada para formular preguntas de sí o no, observar el movimiento del péndulo y registrar tus reflexiones. Las respuestas son parte de una práctica interpretativa, no una predicción ni una certeza para tomar decisiones.",
    precio: 1990,
    duracion: "15 minutos",
    imagen: "/imagenes/experiencia-pendulo.png",
    alt: "Péndulo de amatista con cadena de bronce sobre una base de madera oscura",
  },
];

export default experiencias;

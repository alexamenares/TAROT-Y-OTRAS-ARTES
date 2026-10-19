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
    imagen: "/imagenes/experiencia-una-carta.png",
    alt: "Una carta de reverso botánico sobre terciopelo violeta con amuleto ouroboros.",
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
    imagen: "/imagenes/experiencia-tres-cartas.png",
    alt: "Tres cartas de reverso botánico dispuestas sobre terciopelo violeta.",
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
    imagen: "/imagenes/experiencia-sanar-y-soltar-seis-espadas.png",
    alt: "Seis de Espadas Rider-Waite en un soporte de bronce, rodeado de vela y terciopelo violeta.",
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

  {
    id: "6",
    categoria: "Runas",
    nombre: "Una runa",
    descripcion:
      "Explora un símbolo rúnico y una reflexión breve para orientar tu pregunta.",
    detalle:
      "Una práctica guiada para tomar una runa, observar sus formas y registrar una reflexión personal. Su propósito es acompañar la introspección; no entrega predicciones ni certezas para tomar decisiones importantes.",
    precio: 1990,
    duracion: "10 minutos",
    imagen: "/imagenes/experiencia-una-runa.png",
    alt: "Runas de piedra sobre terciopelo violeta, acompañadas por una vela, amatista y un símbolo ouroboros.",
  },
];

export default experiencias;

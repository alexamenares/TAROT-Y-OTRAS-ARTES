/**
 * CONTENIDO EDITORIAL · Fuente de las tarjetas y lecturas del blog.
 * slug identifica la URL; secciones contiene pares de título y texto.
 * Editar aquí el contenido evita mezclar los artículos con su presentación.
 */
const articulos = [
  {
    slug: "tirada-diaria",
    meta: "Práctica diaria · 6 min de lectura",
    titulo: "Cómo iniciar una tirada diaria sin complicarte",
    resumen:
      "Una práctica breve para observar símbolos y comenzar el día con una pregunta consciente.",
    imagen: "/imagenes/00-el-loco.png",
    alt: "Carta El Loco asociada a una práctica diaria",
    introduccion:
      "Una tirada diaria no necesita convertirse en una predicción. Puede ser una pausa sencilla para reconocer cómo llegas al día y qué merece tu atención.",
    secciones: [
      [
        "1. Formula una pregunta abierta",
        "Evita preguntas que solo admitan sí o no. Prueba con: ¿Qué necesito observar hoy? o ¿Qué actitud puede acompañarme mejor?",
      ],
      [
        "2. Observa símbolos antes de buscar significados",
        "Mira colores, gestos y objetos. Anota primero lo que la imagen despierta en ti y luego contrástalo con una guía.",
      ],
      [
        "3. Registra una conclusión breve",
        "Cierra con una frase y una acción pequeña. El valor está en conectar la imagen con una decisión consciente.",
      ],
    ],
  },
  {
    slug: "preparar-cartas",
    meta: "Cuidado del mazo · 5 min de lectura",
    titulo: "Rituales simples para preparar tus cartas",
    resumen:
      "Orden, intención y cuidado para crear un espacio de lectura sereno y personal.",
    imagen: "/imagenes/27-seis-de-bastos.png",
    alt: "Carta Seis de Bastos asociada a la preparación del mazo",
    introduccion:
      "Preparar las cartas no exige objetos especiales. Lo importante es construir una transición clara entre el ritmo cotidiano y el momento de observación.",
    secciones: [
      [
        "1. Ordena el espacio de lectura",
        "Retira distracciones y deja solo lo necesario: el mazo, una libreta y una superficie cómoda y limpia.",
      ],
      [
        "2. Define la intención",
        "Antes de barajar, nombra en una frase qué deseas comprender. Una intención concreta ayuda a leer con honestidad.",
      ],
      [
        "3. Cierra la práctica",
        "Guarda las cartas, anota una conclusión y agradece el tiempo dedicado. El cierre evita dejar preguntas abiertas sin contexto.",
      ],
    ],
  },
];

export default articulos;

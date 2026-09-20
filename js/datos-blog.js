/*
  Arreglo de artículos del blog.
  Cada artículo sigue la estructura definida en las reglas de negocio
  (RN-B01) y podrá ser consumido por blog.html y blog-detalle.html.

  Cuando exista backend, este arreglo será reemplazado por:
  GET /api/contenido/blog
*/
const articulosBlog = [
  {
    id: "art-001",
    slug: "tirada-diaria",
    titulo: "Cómo iniciar una tirada diaria sin complicarte",
    autor: {
      id: "usr-001",
      nombre: "Equipo Tarot y Otras Artes",
    },
    fecha: "2026-03-15",
    categoria: "practica-diaria",
    categoriaVisible: "Práctica diaria",
    etiquetas: ["tarot", "principiantes", "rutina"],
    imagenPortada: "imagenes/00-el-loco.png",
    altImagen: "Carta El Loco para representar el inicio de una práctica",
    extracto:
      "Una guía breve para formular una pregunta clara, elegir una carta y registrar una reflexión útil para el día.",
    tiempoLectura: 6,
    estado: "publicado",
    idioma: "es",
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Una tirada diaria puede ser tan sencilla como detenerse unos minutos, respirar y formular una pregunta que sí puedas observar durante el día. En este MVP la propuesta es educativa y reflexiva: la carta acompaña la interpretación, pero la decisión sigue siendo de la persona.",
      },
      { tipo: "subtitulo", texto: "1. Formula una pregunta abierta" },
      {
        tipo: "parrafo",
        texto:
          "Evita preguntas que dependan de una respuesta rígida como “sí” o “no”. En su lugar, usa preguntas como “¿qué actitud necesito observar hoy?” o “¿qué aprendizaje puede acompañarme?”.",
      },
      { tipo: "subtitulo", texto: "2. Observa símbolos antes de buscar significados" },
      {
        tipo: "parrafo",
        texto:
          "Mira colores, personajes, dirección de la mirada y sensación general. Esa primera impresión ayuda a que la lectura no sea solamente memorizar palabras clave.",
      },
      {
        tipo: "bloque-destacado",
        texto:
          "<strong>Idea para practicar:</strong> escribe una frase breve al sacar la carta y vuelve a leerla al final del día. La comparación puede mostrar matices que al comienzo no estaban tan claros.",
      },
      { tipo: "subtitulo", texto: "3. Registra una conclusión breve" },
      {
        tipo: "parrafo",
        texto:
          "Un diario simple puede incluir fecha, carta, pregunta, emoción inicial y aprendizaje. No es necesario escribir mucho: basta una observación honesta y concreta.",
      },
    ],
  },
  {
    id: "art-002",
    slug: "preparar-cartas",
    titulo: "Rituales simples para preparar tus cartas",
    autor: {
      id: "usr-001",
      nombre: "Equipo Tarot y Otras Artes",
    },
    fecha: "2026-03-10",
    categoria: "cuidado-mazo",
    categoriaVisible: "Cuidado del mazo",
    etiquetas: ["tarot", "ritual", "cuidado"],
    imagenPortada: "imagenes/27-seis-de-bastos.png",
    altImagen: "Carta Seis de Bastos para representar avance y confianza",
    extracto:
      "Ideas sencillas y responsables para ordenar tu espacio, concentrarte y cuidar tus herramientas de lectura.",
    tiempoLectura: 5,
    estado: "publicado",
    idioma: "es",
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Preparar las cartas no tiene que ser complejo. En esta etapa del proyecto, el objetivo es mostrar una práctica simulada y comprensible: ordenar el espacio, cuidar la intención y recordar que el Tarot funciona como herramienta de reflexión personal.",
      },
      { tipo: "subtitulo", texto: "1. Ordena el espacio de lectura" },
      {
        tipo: "parrafo",
        texto:
          "Un lugar despejado ayuda a reducir distracciones. Puede bastar con una mesa limpia, una libreta y el mazo listo para mezclar.",
      },
      { tipo: "subtitulo", texto: "2. Define la intención" },
      {
        tipo: "parrafo",
        texto:
          "Antes de sacar cartas, escribe una frase breve que explique qué quieres mirar. Esto evita que la lectura se vuelva confusa o demasiado amplia.",
      },
      {
        tipo: "bloque-destacado",
        texto:
          "<strong>Recordatorio responsable:</strong> una lectura puede acompañar decisiones, pero no reemplaza apoyo médico, psicológico, legal o financiero cuando corresponde.",
      },
      { tipo: "subtitulo", texto: "3. Cierra la práctica" },
      {
        tipo: "parrafo",
        texto:
          "Después de revisar las cartas, guarda el mazo y anota una acción concreta. Ese cierre transforma la lectura en una reflexión aplicable.",
      },
    ],
  },
];

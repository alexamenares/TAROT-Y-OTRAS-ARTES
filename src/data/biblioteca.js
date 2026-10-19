const recursosBiblioteca = [
  {
    id: 1,
    categoria: "Aprendizaje",
    titulo: "Arcanos mayores para empezar",
    descripcion:
      "Introducción breve a las cartas que representan etapas, decisiones y aprendizajes profundos.",
    imagen: "/imagenes/biblioteca-tirada-simple.png",
    alt: "Preparación de una tirada simple con carta de reverso botánico, libreta y pluma.",
  },
  {
    id: 2,
    categoria: "Guías",
    titulo: "Cómo preparar una tirada simple",
    descripcion:
      "Pasos para ordenar la pregunta, elegir una carta y registrar una primera impresión.",
    imagen: "/imagenes/biblioteca-tirada-simple.png",
    alt: "Tirada simple sobre terciopelo violeta con libreta, pluma, amatista y sello ouroboros.",
  },
  {
    id: 3,
    categoria: "Historia",
    titulo: "Origen simbólico del Tarot",
    descripcion:
      "Recorrido resumido por el uso cultural de las cartas como imágenes y narración.",
    imagen: "/imagenes/biblioteca-origen-simbolico.png",
    alt: "Libro histórico abierto con grabados ornamentales, lupa y cartas de reverso botánico.",
  },
  {
    id: 4,
    categoria: "Guías",
    titulo: "Diario de lecturas",
    descripcion:
      "Plantilla para anotar fecha, pregunta, carta, observaciones y una acción posible.",
    imagen: "/imagenes/biblioteca-diario-lecturas.png",
    alt: "Diario abierto para registrar lecturas, con pluma, amatista y una carta.",
  },
  {
    id: 5,
    categoria: "Aprendizaje",
    titulo: "Lectura intuitiva responsable",
    descripcion:
      "Recomendaciones para usar el Tarot como apoyo reflexivo, sin reemplazar ayuda profesional.",
    imagen: "/imagenes/biblioteca-lectura-intuitiva.png",
    alt: "Balanza de bronce, brújula y libreta como símbolos de reflexión responsable.",
  },
  {
    id: 6,
    categoria: "Historia",
    titulo: "Tarot y arte editorial",
    descripcion:
      "Una mirada a la relación entre imagen, narrativa y diseño en distintas barajas.",
    imagen: "/imagenes/biblioteca-arte-editorial.png",
    alt: "Libro de arte, plancha de impresión y cartas de reverso botánico.",
  },
];

/**
 * Cada id une la tarjeta del catálogo con su lectura en /biblioteca/:id.
 * Separamos contenido de presentación: aquí se edita lo que se enseña;
 * DetalleRecurso decide cómo mostrarlo y qué actividad ofrecer.
 */
const lecturas = {
  1: {
    actividad: "arcanos",
    secciones: [
      {
        titulo: "Observa antes de interpretar",
        texto:
          "Empieza por describir la imagen: personajes, objetos, colores y dirección de las miradas. Distingue lo que efectivamente ves de las asociaciones que te despierta. Una carta admite distintas lecturas según la pregunta y el contexto.",
      },
      {
        titulo: "Del símbolo a una pregunta",
        texto:
          "En este explorador, cada arcano incluye una propuesta de reflexión. No son definiciones únicas ni anuncios del futuro: usa la pregunta como punto de partida y busca un ejemplo concreto de tu vida cotidiana.",
      },
      {
        titulo: "Tu primera práctica",
        texto:
          "Elige un arcano, observa sus detalles y escribe tres palabras propias. Después compara tu impresión con la propuesta de la ficha. Puedes guardar el ejercicio en Diario de lecturas.",
      },
    ],
  },
  2: {
    actividad: "practica",
    secciones: [
      {
        titulo: "1. Prepara el espacio y la pregunta",
        texto:
          "Busca unos minutos sin interrupciones. Formula una pregunta abierta y centrada en ti, por ejemplo: ¿qué puedo atender hoy? Evita pedir certezas sobre otras personas o decisiones que necesiten información profesional.",
      },
      {
        titulo: "2. Observa una carta",
        texto:
          "Usa el explorador inferior para elegir una imagen o sacar una al azar. Describe primero lo visible y luego las emociones o ideas que te sugiere. El sorteo de esta página es una práctica de observación, no una predicción.",
      },
      {
        titulo: "3. Cierra con una acción",
        texto:
          "Anota una acción pequeña y verificable: conversar, organizar una tarea o dedicar unos minutos al descanso. Al final del día, revisa qué hiciste y qué aprendiste. Puedes llevar esa reflexión al diario.",
      },
    ],
  },
  3: {
    secciones: [
      {
        titulo: "Cartas de juego antes que adivinación",
        texto:
          "Los testimonios conservados sitúan las primeras barajas de Tarot en la Italia del siglo XV, vinculadas al juego. Las cartas Visconti-Sforza son un ejemplo destacado de esa producción para la aristocracia.",
      },
      {
        titulo: "Usos que cambian con el tiempo",
        texto:
          "La asociación actual entre Tarot y adivinación es posterior a esas barajas. Distinguir los usos lúdicos de los usos interpretativos ayuda a estudiar las imágenes sin confundir una tradición simbólica con su origen histórico.",
      },
      {
        titulo: "Una actividad de observación",
        texto:
          "Abre la colección del museo y compara una carta histórica con una del explorador de esta biblioteca. Anota qué cambia en los colores, la vestimenta y la composición; separa esa descripción de tu interpretación personal.",
      },
    ],
    fuentes: [
      {
        titulo:
          "La fascinante historia de las cartas del tarot: de un famoso juego de cartas a un ritual místico",
        url: "https://mymodernmet.com/es/historia-cartas-tarot/",
      },
    ],
  },
  4: {
    actividad: "diario",
    secciones: [
      {
        titulo: "Escribir para recordar",
        texto:
          "Registra la fecha, tu pregunta y la carta observada. Describe después lo que te llamó la atención y una acción posible. No necesitas una interpretación definitiva: el diario sirve para reconocer cómo cambia tu mirada.",
      },
      {
        titulo: "Volver sobre una lectura",
        texto:
          "Revisa las entradas guardadas para comparar tu primera impresión con lo que ocurrió después. Puedes editar una entrada o eliminarla con confirmación. Tus anotaciones se conservan mientras dure esta sesión del navegador.",
      },
    ],
  },
  5: {
    secciones: [
      {
        titulo: "Escuchar sin imponer",
        texto:
          "Una lectura reflexiva abre posibilidades; no dicta cómo debe vivir otra persona. Usa frases como esta imagen me sugiere y pregunta si esa asociación resulta útil. Acepta que una interpretación puede no tener sentido para quien consulta.",
      },
      {
        titulo: "Poner límites claros",
        texto:
          "Evita diagnosticar, prometer resultados o asegurar lo que otra persona piensa. Cuando un asunto necesita atención especializada, las imágenes no reemplazan esa orientación. La persona conserva su capacidad de decidir y de detener la actividad.",
      },
      {
        titulo: "Reformular una pregunta",
        texto:
          "Transforma ¿qué va a pasar inevitablemente? en ¿qué información me falta y qué puedo hacer ahora? Anota dos alternativas y una acción que dependa de ti. El valor del ejercicio está en la reflexión que construyes.",
      },
    ],
  },
  6: {
    secciones: [
      {
        titulo: "La carta como composición",
        texto:
          "Observa cómo el marco, la escala y la posición de los personajes orientan tu atención. El título y la numeración ayudan a reconocer una carta; el color y los objetos aportan otras pistas para leerla visualmente.",
      },
      {
        titulo: "Materiales y circulación",
        texto:
          "La exposición The World in Play del Metropolitan Museum reúne cartas pintadas a mano, ejemplos xilográficos y grabados. Estas técnicas permiten observar distintas formas de producir y difundir imágenes sobre un formato pequeño.",
      },
      {
        titulo: "Diseña tu ficha de observación",
        texto:
          "Elige dos cartas de la biblioteca. Compara el foco principal, los contrastes y los bordes. En tu diario escribe qué elemento viste primero y qué cambiaría si se eliminara. No necesitas saber dibujar para analizar una composición.",
      },
    ],
    fuentes: [
      {
        titulo: "The Met · The World in Play: Luxury Cards, 1430–1540",
        url: "https://www.metmuseum.org/exhibitions/listings/2016/world-in-play",
      },
    ],
  },
};

export default recursosBiblioteca.map((recurso) => ({
  ...recurso,
  ...lecturas[recurso.id],
}));

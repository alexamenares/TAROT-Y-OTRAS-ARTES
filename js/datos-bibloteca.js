/*
  Arreglo de recursos de la biblioteca pública.
  Estructura alineada con las reglas de negocio del módulo de contenido
  (RN-L01): id, slug, titulo, categoria, nivel, tipo, sistemas, imagen, etc.

  Cuando exista backend, será reemplazado por:
  GET /api/contenido/biblioteca
*/
const recursosBiblioteca = [
  {
    id: "bib-001",
    slug: "arcanos-mayores",
    titulo: "Arcanos mayores para empezar",
    categoria: "aprendizaje",
    categoriaVisible: "Aprendizaje",
    nivel: "inicial",
    nivelVisible: "Inicial",
    tipo: "guia",
    sistemas: ["tarot"],
    imagen: "imagenes/00-el-loco.png",
    altImagen: "Carta El Loco como inicio del aprendizaje de Tarot",
    descripcion:
      "Introducción breve a las cartas que representan etapas, decisiones y aprendizajes importantes.",
    duracion: "8 min",
    adjuntos: [],
    estado: "publicado",
  },
  {
    id: "bib-002",
    slug: "tirada-simple",
    titulo: "Cómo preparar una tirada simple",
    categoria: "guia",
    categoriaVisible: "Guía",
    nivel: "inicial",
    nivelVisible: "Inicial",
    tipo: "guia",
    sistemas: ["tarot"],
    imagen: "imagenes/27-seis-de-bastos.png",
    altImagen: "Carta Seis de Bastos para representar una guía práctica",
    descripcion:
      "Pasos sugeridos para ordenar la pregunta, elegir una carta y registrar la reflexión personal.",
    duracion: "8 min",
    adjuntos: [],
    estado: "publicado",
  },
  {
    id: "bib-003",
    slug: "origen-tarot",
    titulo: "Origen simbólico del Tarot",
    categoria: "historia",
    categoriaVisible: "Historia",
    nivel: "intermedio",
    nivelVisible: "Intermedio",
    tipo: "historia",
    sistemas: ["tarot"],
    imagen: "imagenes/52-tres-de-espadas.png",
    altImagen: "Carta Tres de Espadas asociada a simbolismo histórico",
    descripcion:
      "Recorrido resumido por el uso cultural de las cartas como lenguaje visual y herramienta de interpretación.",
    duracion: "10 min",
    adjuntos: [],
    estado: "publicado",
  },
  {
    id: "bib-004",
    slug: "diario-lecturas",
    titulo: "Diario de lecturas",
    categoria: "guia",
    categoriaVisible: "Guía",
    nivel: "inicial",
    nivelVisible: "Inicial",
    tipo: "ejercicio",
    sistemas: ["tarot"],
    imagen: "imagenes/14-la-templanza.png",
    altImagen:
      "Carta La Templanza como apoyo visual para un diario de lecturas",
    descripcion:
      "Plantilla simulada para anotar fecha, pregunta, carta, emoción inicial y aprendizaje posterior.",
    duracion: "5 min",
    adjuntos: [],
    estado: "publicado",
  },
  {
    id: "bib-005",
    slug: "lectura-intuitiva",
    titulo: "Lectura intuitiva responsable",
    categoria: "aprendizaje",
    categoriaVisible: "Aprendizaje",
    nivel: "intermedio",
    nivelVisible: "Intermedio",
    tipo: "aprendizaje",
    sistemas: ["tarot"],
    imagen: "imagenes/01-el-mago.png",
    altImagen:
      "Carta El Mago para representar una lectura intuitiva responsable",
    descripcion:
      "Recomendaciones para usar el Tarot como apoyo reflexivo, sin prometer certezas ni reemplazar orientación guia.",
    duracion: "7 min",
    adjuntos: [],
    estado: "publicado",
  },
  {
    id: "bib-006",
    slug: "tarot-arte",
    titulo: "Tarot y arte editorial",
    categoria: "historia",
    categoriaVisible: "Historia",
    nivel: "avanzado",
    nivelVisible: "Avanzado",
    tipo: "historia",
    sistemas: ["tarot"],
    imagen: "imagenes/21-el-mundo.png",
    altImagen:
      "Carta El Mundo para representar el Tarot como arte editorial",
    descripcion:
      "Nota sobre la relación entre imagen, narrativa y diseño visual dentro de una experiencia mística contemporánea.",
    duracion: "12 min",
    adjuntos: [],
    estado: "publicado",
  },
];

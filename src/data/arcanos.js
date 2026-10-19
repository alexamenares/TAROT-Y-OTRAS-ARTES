/**
 * Fichas educativas del explorador. Las reflexiones son propuestas propias,
 * no significados obligatorios ni predicciones. Los nombres de archivo deben
 * coincidir con las 22 imágenes que ya estaban en public/imagenes.
 */
const fichas = [
  [
    "El Loco",
    "el-loco",
    "Comienzos y curiosidad",
    "¿Qué paso pequeño te gustaría explorar y qué precaución necesitas?",
  ],
  [
    "El Mago",
    "el-mago",
    "Recursos e iniciativa",
    "¿Qué habilidad tienes disponible para empezar?",
  ],
  [
    "La Sacerdotisa",
    "la-sacerdotisa",
    "Escucha y pausa",
    "¿Qué necesitas observar con más calma antes de responder?",
  ],
  [
    "La Emperatriz",
    "la-emperatriz",
    "Cuidado y creatividad",
    "¿Qué proyecto o vínculo necesita atención cotidiana?",
  ],
  [
    "El Emperador",
    "el-emperador",
    "Estructura y límites",
    "¿Qué límite te ayudaría a ordenar tu día?",
  ],
  [
    "El Hierofante",
    "el-hierofante",
    "Aprendizaje y tradición",
    "¿Qué enseñanza recibida quieres revisar con tu propia mirada?",
  ],
  [
    "Los Enamorados",
    "los-enamorados",
    "Elección y valores",
    "¿Qué valor personal orienta la decisión que estás considerando?",
  ],
  [
    "El Carro",
    "el-carro",
    "Dirección y avance",
    "¿Hacia dónde quieres dirigir tu esfuerzo esta semana?",
  ],
  [
    "La Fuerza",
    "la-fuerza",
    "Paciencia y firmeza",
    "¿Cómo puedes actuar con firmeza sin tratarte con dureza?",
  ],
  [
    "El Ermitaño",
    "el-ermitano",
    "Pausa y búsqueda",
    "¿Qué puedes comprender mejor si te das un momento a solas?",
  ],
  [
    "La Rueda de la Fortuna",
    "la-rueda-de-la-fortuna",
    "Cambio y ciclos",
    "¿Qué depende de ti y qué necesitas aceptar como cambiante?",
  ],
  [
    "La Justicia",
    "la-justicia",
    "Equilibrio y responsabilidad",
    "¿Qué información te falta para evaluar una situación con cuidado?",
  ],
  [
    "El Colgado",
    "el-colgado",
    "Espera y perspectiva",
    "¿Qué otra mirada podrías probar antes de actuar?",
  ],
  [
    "La Muerte",
    "la-muerte",
    "Cierre y transformación",
    "¿Qué hábito o etapa estás dispuesto a dejar atrás?",
  ],
  [
    "La Templanza",
    "la-templanza",
    "Moderación y diálogo",
    "¿Qué dos necesidades puedes atender de manera equilibrada?",
  ],
  [
    "El Diablo",
    "el-diablo",
    "Apegos y conciencia",
    "¿Qué costumbre limita tu libertad y qué apoyo te ayudaría a revisarla?",
  ],
  [
    "La Torre",
    "la-torre",
    "Revisión y reconstrucción",
    "¿Qué idea necesita revisarse cuando aparecen nuevos hechos?",
  ],
  [
    "La Estrella",
    "la-estrella",
    "Esperanza y cuidado",
    "¿Qué gesto concreto te devuelve confianza?",
  ],
  [
    "La Luna",
    "la-luna",
    "Incertidumbre e imaginación",
    "¿Cómo puedes distinguir lo que sabes de lo que estás suponiendo?",
  ],
  [
    "El Sol",
    "el-sol",
    "Claridad y alegría",
    "¿Qué logro sencillo puedes reconocer hoy?",
  ],
  [
    "El Juicio",
    "el-juicio",
    "Revisión y aprendizaje",
    "¿Qué has aprendido de una decisión anterior?",
  ],
  [
    "El Mundo",
    "el-mundo",
    "Integración y cierre",
    "¿Qué proceso puedes dar por terminado y agradecer?",
  ],
];

export default fichas.map(([nombre, archivo, tema, pregunta], numero) => ({
  numero,
  nombre,
  tema,
  pregunta,
  imagen: `/imagenes/${String(numero).padStart(2, "0")}-${archivo}.png`,
}));

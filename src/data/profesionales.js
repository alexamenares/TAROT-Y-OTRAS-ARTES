/**
 * AGENDA SIMULADA · Profesionales con id, especialidad, fechas y horarios.
 * Las fechas se generan al cargar el módulo, a partir de mañana en hora local.
 * Agenda presenta estas opciones y reservaService valida que la cita pertenezca
 * a ellas. La ocupación se guarda por separado en sessionStorage.
 */
function crearFechasDisponibles() {
  return Array.from({ length: 6 }, (_, indice) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + indice + 1);
    // La fecha de una cita es local. UTC podría adelantar el día en Chile.
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${fecha.getFullYear()}-${mes}-${dia}`;
  });
}

const fechas = crearFechasDisponibles();

const profesionales = [
  {
    id: "alma",
    nombre: "Alma Rojas",
    especialidad: "Tarotista",
    descripcion:
      "Lecturas simbólicas orientadas a decisiones y procesos personales.",
    // Esta imagen representa el servicio, no el rostro de Alma. Así se puede
    // mantener aunque la persona profesional cambie en una versión futura.
    imagen: "/imagenes/profesionales/tarotista-alma-rojas.png",
    fechas,
    horarios: ["10:00", "12:00", "17:00"],
  },
  {
    id: "elena",
    nombre: "Elena Silva",
    especialidad: "Terapeuta",
    descripcion:
      "Acompañamiento integrativo para reconocer emociones y recursos personales.",
    imagen: "/imagenes/profesionales/terapeuta-elena-silva.png",
    fechas: fechas.slice(1),
    horarios: ["09:30", "15:00", "18:30"],
  },
  {
    id: "matias",
    nombre: "Matías León",
    especialidad: "Lector de runas",
    descripcion:
      "Sesiones de interpretación de símbolos nórdicos y escritura reflexiva.",
    imagen: "/imagenes/profesionales/lector-runas-matias-leon.png",
    fechas: fechas.slice(0, 5),
    horarios: ["11:00", "16:00", "19:00"],
  },
  {
    id: "camila",
    nombre: "Camila Soto",
    especialidad: "Psicóloga",
    descripcion:
      "Orientación psicológica breve para organizar una inquietud y definir próximos pasos.",
    imagen: "/imagenes/profesionales/psicologa-camila-soto.png",
    fechas: fechas.slice(2),
    horarios: ["10:30", "14:30", "17:30"],
  },
  {
    id: "sofia",
    nombre: "Sofía Morales",
    especialidad: "Consteladora familiar",
    descripcion:
      "Espacio individual para observar vínculos, posiciones y dinámicas familiares.",
    imagen: "/imagenes/profesionales/consteladora-sofia-morales.png",
    fechas,
    horarios: ["09:00", "13:00", "18:00"],
  },
];

export const especialidades = [
  ...new Set(profesionales.map((profesional) => profesional.especialidad)),
];
export default profesionales;

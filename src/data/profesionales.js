function crearFechasDisponibles() {
  return Array.from({ length: 6 }, (_, indice) => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + indice + 1);
    return fecha.toISOString().slice(0, 10);
  });
}

const fechas = crearFechasDisponibles();

const profesionales = [
  { id: "alma", nombre: "Alma Rojas", especialidad: "Tarotista", descripcion: "Lecturas simbólicas orientadas a decisiones y procesos personales.", imagen: "/imagenes/02-la-sacerdotisa.png", fechas, horarios: ["10:00", "12:00", "17:00"] },
  { id: "elena", nombre: "Elena Silva", especialidad: "Terapeuta", descripcion: "Acompañamiento integrativo para reconocer emociones y recursos personales.", imagen: "/imagenes/14-la-templanza.png", fechas: fechas.slice(1), horarios: ["09:30", "15:00", "18:30"] },
  { id: "matias", nombre: "Matías León", especialidad: "Lector de runas", descripcion: "Sesiones de interpretación de símbolos nórdicos y escritura reflexiva.", imagen: "/imagenes/productos/set-runas.png", fechas: fechas.slice(0, 5), horarios: ["11:00", "16:00", "19:00"] },
  { id: "camila", nombre: "Camila Soto", especialidad: "Psicóloga", descripcion: "Orientación psicológica breve para organizar una inquietud y definir próximos pasos.", imagen: "/imagenes/17-la-estrella.png", fechas: fechas.slice(2), horarios: ["10:30", "14:30", "17:30"] },
  { id: "sofia", nombre: "Sofía Morales", especialidad: "Consteladora familiar", descripcion: "Espacio individual para observar vínculos, posiciones y dinámicas familiares.", imagen: "/imagenes/21-el-mundo.png", fechas, horarios: ["09:00", "13:00", "18:00"] },
];

export const especialidades = [...new Set(profesionales.map((profesional) => profesional.especialidad))];
export default profesionales;

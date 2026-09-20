/*
  Arreglo semilla de usuarios del sistema.
  Se usa en el mantenedor de usuarios del panel admin (modo simulado).
  Cuando exista backend, será reemplazado por:
  GET /api/usuarios
*/
const usuariosSemilla = [
  {
    id: "usr-001",
    run: "19011022K",
    nombre: "Esteban",
    apellidos: "Valenzuela",
    correo: "esteban.valenzuela@gmail.com",
    telefono: "+56912345678",
    region: "Metropolitana de Santiago",
    comuna: "Ñuñoa",
    direccion: "Av. Irarrázaval 1234, Depto 501",
    rol: "admin",
    fechaNacimiento: "1995-04-12",
    estado: "activo",
  },
  {
    id: "usr-002",
    run: "20123344K",
    nombre: "Alexandra",
    apellidos: "Menares",
    correo: "alexandra.menares@gmail.com",
    telefono: "+56987654321",
    region: "Valparaíso",
    comuna: "Viña del Mar",
    direccion: "Calle Los Robles 456",
    rol: "admin",
    fechaNacimiento: "1997-08-22",
    estado: "activo",
  },
  {
    id: "usr-003",
    run: "16777888K",
    nombre: "María",
    apellidos: "Lagos",
    correo: "maria.lagos@gmail.com",
    telefono: "+56955554444",
    region: "Biobío",
    comuna: "Concepción",
    direccion: "Calle O'Higgins 789",
    rol: "guia",
    fechaNacimiento: "1988-02-15",
    estado: "activo",
  },
  {
    id: "usr-004",
    run: "21099887K",
    nombre: "Carla",
    apellidos: "Soto",
    correo: "carla.soto@gmail.com",
    telefono: "+56944443333",
    region: "Metropolitana de Santiago",
    comuna: "Providencia",
    direccion: "Av. Providencia 2345",
    rol: "consultante",
    fechaNacimiento: "2000-11-03",
    estado: "activo",
  },
];

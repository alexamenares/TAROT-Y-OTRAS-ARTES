export function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(valor);
}

export function formatearFecha(fechaIso) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
  }).format(new Date(`${fechaIso}T12:00:00`));
}

export function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

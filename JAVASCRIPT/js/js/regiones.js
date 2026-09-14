const REGIONES = {
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
  "Región de la Araucanía": ["Temuco", "Villarrica", "Pucón"],
  "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles"]
};

document.addEventListener("DOMContentLoaded", () => {
  const regionSel = document.getElementById("region");
  const comunaSel = document.getElementById("comuna");
  if (!regionSel || !comunaSel) return;

  Object.keys(REGIONES).forEach(r => {
    const opt = document.createElement("option");
    opt.value = r; opt.textContent = r;
    regionSel.appendChild(opt);
  });

  regionSel.addEventListener("change", () => {
    comunaSel.innerHTML = '<option value="">Seleccione una comuna</option>';
    (REGIONES[regionSel.value] || []).forEach(c => {
      const opt = document.createElement("option");
      opt.value = c; opt.textContent = c;
      comunaSel.appendChild(opt);
    });
  });
});
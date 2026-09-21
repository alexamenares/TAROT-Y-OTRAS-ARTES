/**
 * Registra en una sola carga los componentes oficiales Material Web usados en
 * V4. Las importaciones hacen que las etiquetas md-* de los HTML se comporten
 * como componentes accesibles con estilos de Material Design.
 */
import "@material/web/common.js";

const componentesMaterial = [
  "md-filled-button",
  "md-outlined-button",
  "md-text-button",
  "md-outlined-text-field",
  "md-filter-chip",
  "md-icon-button",
  "md-dialog",
];

Promise.all(
  componentesMaterial.map((etiqueta) => customElements.whenDefined(etiqueta)),
).then(() => {
  document.documentElement.classList.add("material-web-listo");
  window.dispatchEvent(new CustomEvent("material-web-listo"));
});

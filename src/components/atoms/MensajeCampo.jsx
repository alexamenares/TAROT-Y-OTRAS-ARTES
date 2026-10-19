/**
 * ÁTOMO · Centraliza la presentación de un error de formulario.
 * Recibe mensaje e id opcional; si no hay error evita mostrar texto vacío.
 */
function MensajeCampo({ mensaje, id }) {
  return (
    <div className="mensaje-campo" id={id} aria-live="polite">
      {mensaje}
    </div>
  );
}

export default MensajeCampo;

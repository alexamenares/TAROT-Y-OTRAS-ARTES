/* Recibe límites y acciones; el botón nunca permite bajar de 1 ni superar stock. */
function ControlCantidad({ cantidad, maximo, onRestar, onSumar, nombre }) {
  return (
    <div className="control-cantidad" aria-label={`Cantidad de ${nombre}`}>
      <button type="button" onClick={onRestar} disabled={cantidad <= 1} aria-label={`Restar una unidad de ${nombre}`}>
        <span aria-hidden="true">−</span>
      </button>
      <output aria-live="polite">{cantidad}</output>
      <button type="button" onClick={onSumar} disabled={maximo !== null && cantidad >= maximo} aria-label={`Agregar una unidad de ${nombre}`}>
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

export default ControlCantidad;

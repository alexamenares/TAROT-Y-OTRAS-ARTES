function MensajeCampo({ mensaje, id }) {
  return (
    <div className="mensaje-campo" id={id} aria-live="polite">
      {mensaje}
    </div>
  );
}

export default MensajeCampo;

/**
 * MOLÉCULA · Cabecera visual compartida por las páginas interiores.
 * Las props entregan etiqueta, título, descripción e imagen; la estructura
 * y las clases CSS se mantienen comunes para conservar la identidad del sitio.
 */
import Etiqueta from "../atoms/Etiqueta";

/* HeroPagina unifica altura, contraste y jerarquía; recibe el contenido y la imagen aprobada. */
function HeroPagina({
  etiqueta,
  titulo,
  descripcion,
  imagen,
  grande = false,
  children,
}) {
  return (
    <section
      className={`hero-pagina ${grande ? "hero-pagina--grande" : ""}`}
      style={{ "--imagen-hero": `url(${imagen})` }}
      aria-labelledby="titulo-pagina"
    >
      <div className="container hero-pagina__contenido">
        <Etiqueta>{etiqueta}</Etiqueta>
        <h1 id="titulo-pagina">{titulo}</h1>
        {descripcion && (
          <p className="hero-pagina__descripcion">{descripcion}</p>
        )}
        {children}
      </div>
    </section>
  );
}

export default HeroPagina;

/**
 * ÁTOMO · Presenta valores del catálogo: cero se muestra como Gratis.
 * Los demás se formatean en pesos chilenos mediante utils/formato.js.
 */
import { formatearPrecio } from "../../utils/formato";

function Precio({ valor, gratis = "Gratis", className = "precio" }) {
  return (
    <span className={className}>
      {valor === 0 ? gratis : formatearPrecio(valor)}
    </span>
  );
}

export default Precio;

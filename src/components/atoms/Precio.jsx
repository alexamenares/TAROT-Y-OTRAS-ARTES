import { formatearPrecio } from "../../utils/formato";

function Precio({ valor, gratis = "Gratis", className = "precio" }) {
  return <span className={className}>{valor === 0 ? gratis : formatearPrecio(valor)}</span>;
}

export default Precio;

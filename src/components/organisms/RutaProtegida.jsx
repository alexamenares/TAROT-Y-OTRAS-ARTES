import { Navigate, useLocation } from "react-router-dom";
import { useSesion } from "../../contexts/SesionContext";

/* Conserva la ruta solicitada para retomarla después del ingreso simulado. */
function RutaProtegida({ children }) {
  const { usuario } = useSesion();
  const location = useLocation();
  return usuario ? children : <Navigate to="/ingresar" replace state={{ desde: location.pathname }} />;
}

export default RutaProtegida;

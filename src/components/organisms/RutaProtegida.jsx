/**
 * ORGANISMO · Control de navegación de la sesión académica.
 * Con usuario muestra children; sin usuario redirige y recuerda el destino.
 * Esto es una protección visual del frontend, no autorización de un servidor.
 */
import { Navigate, useLocation } from "react-router-dom";
import { useSesion } from "../../contexts/SesionContext";

/* Conserva la ruta solicitada para retomarla después del ingreso simulado. */
function RutaProtegida({ children }) {
  const { usuario } = useSesion();
  const location = useLocation();
  return usuario ? (
    children
  ) : (
    <Navigate to="/ingresar" replace state={{ desde: location.pathname }} />
  );
}

export default RutaProtegida;

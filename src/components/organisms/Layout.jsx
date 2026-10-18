/**
 * ORGANISMO · Estructura común: Encabezado, main con Outlet y PiePagina.
 * Outlet recibe la página de la ruta activa. useEffect vuelve al inicio
 * del documento cuando cambia pathname, como al cargar una página tradicional.
 */
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Encabezado from "./Encabezado";
import PiePagina from "./PiePagina";

function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div className="aplicacion">
      <Encabezado />
      <main>
        <Outlet />
      </main>
      <PiePagina />
    </div>
  );
}

export default Layout;

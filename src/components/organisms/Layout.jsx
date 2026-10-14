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
      <main><Outlet /></main>
      <PiePagina />
    </div>
  );
}

export default Layout;

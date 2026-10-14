import { createContext, useContext, useState } from "react";
import * as sesionService from "../services/sesionService";

const SesionContext = createContext(null);

/* La sesión se comparte para proteger Agenda y adaptar el encabezado. */
export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(() => sesionService.obtenerUsuario());

  const valor = {
    usuario,
    ingresar(datos) {
      const nuevoUsuario = sesionService.iniciarSesion(datos);
      setUsuario(nuevoUsuario);
      return nuevoUsuario;
    },
    salir() {
      sesionService.cerrarSesion();
      setUsuario(null);
    },
  };

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

/* El hook permanece junto al Provider para exponer una única API de sesión. */
// eslint-disable-next-line react-refresh/only-export-components
export function useSesion() {
  return useContext(SesionContext);
}

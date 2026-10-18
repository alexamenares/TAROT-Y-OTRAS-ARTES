/**
 * PUNTO DE ENTRADA: index.html contiene el elemento #root que React ocupa.
 * BrowserRouter habilita rutas; SesionProvider y CarritoProvider comparten
 * estado con toda la aplicación. Bootstrap se importa antes del CSS propio.
 * StrictMode ayuda a detectar errores de desarrollo; no duplica reservas.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { CarritoProvider } from "./contexts/CarritoContext.jsx";
import { SesionProvider } from "./contexts/SesionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SesionProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </SesionProvider>
    </BrowserRouter>
  </StrictMode>,
);

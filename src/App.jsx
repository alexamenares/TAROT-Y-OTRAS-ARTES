/**
 * MAPA DEL SITIO: cada Route vincula una URL con una pantalla de pages/.
 * Layout mantiene encabezado y pie; :id y :slug son parámetros de la URL.
 * RutaProtegida exige sesión para agenda y reservas; * muestra 404.
 * Para añadir una pantalla, importa su componente y declara su ruta aquí.
 */
import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/ritual.css";
import Layout from "./components/organisms/Layout";
import RutaProtegida from "./components/organisms/RutaProtegida";
import Administracion from "./pages/Administracion";
import Agenda from "./pages/Agenda";
import ArticuloBlog from "./pages/ArticuloBlog";
import Biblioteca from "./pages/Biblioteca";
import DetalleRecurso from "./pages/DetalleRecurso";
import Blog from "./pages/Blog";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import DetalleExperiencia from "./pages/DetalleExperiencia";
import DetalleProducto from "./pages/DetalleProducto";
import Experiencias from "./pages/Experiencias";
import FinalizarCompra from "./pages/FinalizarCompra";
import Ingresar from "./pages/Ingresar";
import Inicio from "./pages/InicioReact";
import MisReservas from "./pages/MisReservas";
import NoEncontrada from "./pages/NoEncontrada";
import Nosotros from "./pages/Nosotros";
import PedidoConfirmado from "./pages/PedidoConfirmado";
import Registro from "./pages/Registro";
import Tienda from "./pages/Tienda";

/* App declara rutas; Layout conserva encabezado y pie sin recargar la SPA. */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="experiencias" element={<Experiencias />} />
        <Route path="experiencias/:id" element={<DetalleExperiencia />} />
        <Route path="tienda" element={<Tienda />} />
        <Route path="tienda/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="finalizar-compra" element={<FinalizarCompra />} />
        <Route path="pedido-confirmado" element={<PedidoConfirmado />} />
        <Route path="biblioteca" element={<Biblioteca />} />
        <Route path="biblioteca/:id" element={<DetalleRecurso />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<ArticuloBlog />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="ingresar" element={<Ingresar />} />
        <Route path="login" element={<Navigate to="/ingresar" replace />} />
        <Route path="registro" element={<Registro />} />
        <Route
          path="agenda"
          element={
            <RutaProtegida>
              <Agenda />
            </RutaProtegida>
          }
        />
        <Route
          path="mis-reservas"
          element={
            <RutaProtegida>
              <MisReservas />
            </RutaProtegida>
          }
        />
        <Route path="administracion" element={<Administracion />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;

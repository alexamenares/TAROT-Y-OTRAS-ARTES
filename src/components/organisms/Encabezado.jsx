/**
 * ORGANISMO · Navegación y marca presentes en todo el sitio.
 * React Router indica el enlace activo; Bootstrap adapta el menú a móvil.
 * useCarrito actualiza el distintivo de unidades y useSesion adapta los accesos
 * según haya usuario. La imagen del ouróboros conserva el archivo original.
 */
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useCarrito } from "../../contexts/CarritoContext";
import { useSesion } from "../../contexts/SesionContext";

const enlaces = [
  ["/", "Inicio"],
  ["/experiencias", "Experiencias"],
  ["/tienda", "Tienda"],
  ["/biblioteca", "Biblioteca"],
  ["/blog", "Blog"],
  ["/nosotros", "Nosotros"],
  ["/contacto", "Contacto"],
  ["/agenda", "Agenda"],
];

function Encabezado() {
  const { totalUnidades } = useCarrito();
  const { usuario, salir } = useSesion();
  const navigate = useNavigate();

  function cerrarSesion() {
    salir();
    navigate("/");
  }

  return (
    <header className="encabezado-sitio">
      <Navbar expand="xl" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="marca-sitio">
            <img src="/imagenes/ouroboro-identidad-original.png" alt="" />
            <span className="marca-texto">Tarot y Otras Artes</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navegacion-principal"
            aria-label="Abrir menú de navegación"
          />
          <Navbar.Collapse id="navegacion-principal">
            <Nav className="navegacion-principal ms-auto align-items-xl-center">
              {enlaces.map(([ruta, texto]) => (
                <Nav.Link key={ruta} as={NavLink} to={ruta} end={ruta === "/"}>
                  {texto}
                </Nav.Link>
              ))}
              <Nav.Link
                as={NavLink}
                to="/carrito"
                className="boton-carrito"
                aria-label={`Carrito con ${totalUnidades} unidades`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                  <circle cx="10" cy="20" r="1.2" />
                  <circle cx="18" cy="20" r="1.2" />
                </svg>
                {totalUnidades > 0 && (
                  <Badge pill className="contador-carrito">
                    {totalUnidades}
                  </Badge>
                )}
              </Nav.Link>
              {usuario ? (
                <div className="sesion-menu">
                  <Nav.Link as={NavLink} to="/mis-reservas">
                    Mis reservas
                  </Nav.Link>
                  <Button variant="link" onClick={cerrarSesion}>
                    Salir
                  </Button>
                </div>
              ) : (
                <Nav.Link as={NavLink} to="/ingresar">
                  Ingresar
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Encabezado;

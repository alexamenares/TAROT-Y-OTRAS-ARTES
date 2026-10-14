import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PiePagina() {
  return (
    <footer className="pie-pagina">
      <Container>
        <div className="pie-pagina__contenido">
          <div>
            <Link className="marca-footer" to="/">
              <img src="/imagenes/ouroboro-identidad-original.png" alt="" />
              Tarot y Otras Artes
            </Link>
            <p>Experiencias, objetos y recursos para explorar tu camino interior.</p>
          </div>
          <nav aria-label="Enlaces secundarios">
            <Link to="/tienda">Tienda</Link>
            <Link to="/biblioteca">Biblioteca</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/agenda">Agenda</Link>
          </nav>
        </div>
        <p className="copyright">© 2026 Tarot y Otras Artes.</p>
      </Container>
    </footer>
  );
}

export default PiePagina;

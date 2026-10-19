/**
 * RUTA / · Portada con hero, catálogo destacado y accesos a otras secciones.
 * Las experiencias se leen de data/experiencias.js, por lo que las nuevas
 * también aparecen aquí automáticamente. Los enlaces usan React Router.
 * La imagen principal y las secciones se estilizan en styles/ritual.css.
 */
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Etiqueta from "../components/atoms/Etiqueta";
import TarjetaExperiencia from "../components/molecules/TarjetaExperiencia";
import experiencias from "../data/experiencias";

function Inicio() {
  return (
    <>
      <section className="hero-inicio" aria-labelledby="titulo-inicio">
        <Container className="hero-inicio__contenido">
          <Etiqueta>Ritual nocturno · Tarot consciente</Etiqueta>
          <h1 id="titulo-inicio">Tarot y Otras Artes</h1>
          <p className="hero-inicio__bajada">
            Un espacio para explorar tu mundo interior
          </p>
          <p className="hero-inicio__descripcion">
            Cartas, símbolos y preguntas para una vida más consciente. Aquí, el
            Tarot es un puente hacia ti.
          </p>
          <div className="grupo-acciones">
            <Button as={Link} to="/experiencias" variant="ritual">
              Explorar experiencias
            </Button>
            <Button as={Link} to="/nosotros" variant="ritual-outline">
              Conocer el proyecto
            </Button>
          </div>
        </Container>
      </section>

      <section className="seccion-contenido seccion-destacada">
        <Container>
          <div className="encabezado-seccion">
            <div>
              <Etiqueta>Elige tu pausa</Etiqueta>
              <h2>Experiencias destacadas</h2>
            </div>
            <Link className="enlace-dorado" to="/experiencias">
              Ver todas
            </Link>
          </div>
          <Row className="g-4">
            {experiencias.map((experiencia) => (
              <Col lg={4} key={experiencia.id}>
                <TarjetaExperiencia experiencia={experiencia} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="seccion-contenido seccion-superficie">
        <Container>
          <div className="encabezado-seccion centrado">
            <Etiqueta>Recorre el proyecto</Etiqueta>
            <h2>Aprende, conversa y reserva</h2>
          </div>
          <Row className="g-4 accesos-inicio">
            {[
              [
                "/biblioteca",
                "/imagenes/02-la-sacerdotisa.png",
                "Biblioteca",
                "Guías y recursos para estudiar símbolos y tiradas.",
              ],
              [
                "/blog",
                "/imagenes/09-el-ermitano.png",
                "Blog",
                "Lecturas breves para acompañar tu práctica personal.",
              ],
              [
                "/agenda",
                "/imagenes/14-la-templanza.png",
                "Agenda tu sesión",
                "Elige especialidad, profesional, fecha y horario.",
              ],
            ].map(([ruta, imagen, titulo, texto]) => (
              <Col md={4} key={ruta}>
                <article className="acceso-inicio">
                  <img src={imagen} alt="" />
                  <div>
                    <h3>{titulo}</h3>
                    <p>{texto}</p>
                    <Link to={ruta}>
                      Explorar <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="seccion-administracion">
        <Container className="seccion-administracion__contenido">
          <div>
            <Etiqueta>Administración del sitio</Etiqueta>
            <h2>Panel de Administración</h2>
            <p>
              Espacio reservado para administradores y moderadores; se mantiene
              fuera del menú público.
            </p>
          </div>
          <Button as={Link} to="/administracion" variant="ritual-outline">
            Ir al panel interno
          </Button>
        </Container>
      </section>
    </>
  );
}

export default Inicio;

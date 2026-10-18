/**
 * RUTA /experiencias · Convierte cada dato del catálogo en TarjetaExperiencia.
 * Row/Col organizan las tarjetas según el ancho disponible. El contenido
 * y los precios se editan en data/experiencias.js, sin tocar esta pantalla.
 */
import { Col, Container, Row } from "react-bootstrap";
import HeroPagina from "../components/molecules/HeroPagina";
import TarjetaExperiencia from "../components/molecules/TarjetaExperiencia";
import experiencias from "../data/experiencias";

function Experiencias() {
  return (
    <>
      <HeroPagina
        etiqueta="Tienda de experiencias"
        titulo="Explora experiencias para tu camino"
        descripcion="Descubre tiradas, lecturas y meditaciones para acompañar tus momentos de conexión personal."
        imagen="/imagenes/hero-experiencias.png"
      />
      <section className="seccion-contenido">
        <Container>
          <Row className="g-4">
            {experiencias.map((experiencia) => (
              <Col lg={4} key={experiencia.id}>
                <TarjetaExperiencia experiencia={experiencia} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Experiencias;

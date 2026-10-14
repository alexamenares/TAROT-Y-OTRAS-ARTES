import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroPagina from "../components/molecules/HeroPagina";
import articulos from "../data/articulos";

function Blog() {
  return (
    <>
      <HeroPagina etiqueta="Blog público" titulo="Lecturas para acompañar tu práctica" descripcion="Artículos para explorar contenido editorial y páginas de detalle dentro de la versión React." imagen="/imagenes/hero-blog.png" />
      <section className="seccion-contenido"><Container><Row className="g-4">{articulos.map((articulo) => <Col lg={6} key={articulo.slug}><Card className="tarjeta-ritual tarjeta-blog h-100"><Card.Img src={articulo.imagen} alt={articulo.alt} /><Card.Body><p className="tipo-contenido">{articulo.meta}</p><Card.Title as="h2">{articulo.titulo}</Card.Title><Card.Text>{articulo.resumen}</Card.Text><Button as={Link} to={`/blog/${articulo.slug}`} variant="ritual-outline">Leer artículo</Button></Card.Body></Card></Col>)}</Row></Container></section>
    </>
  );
}

export default Blog;

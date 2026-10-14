import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import articulos from "../data/articulos";
import NoEncontrada from "./NoEncontrada";

function ArticuloBlog() {
  const { slug } = useParams();
  const articulo = articulos.find((elemento) => elemento.slug === slug);
  if (!articulo) return <NoEncontrada />;
  return (
    <section className="seccion-contenido"><Container className="contenedor-articulo">
      <Link className="enlace-volver" to="/blog">← Volver al blog</Link>
      <article className="articulo-blog">
        <p className="tipo-contenido">{articulo.meta}</p><h1>{articulo.titulo}</h1><img src={articulo.imagen} alt={articulo.alt} /><p className="introduccion-articulo">{articulo.introduccion}</p>
        {articulo.secciones.map(([titulo, texto]) => <section key={titulo}><h2>{titulo}</h2><p>{texto}</p></section>)}
        <Button as={Link} to="/experiencias" variant="ritual">Explorar experiencias</Button>
      </article>
    </Container></section>
  );
}

export default ArticuloBlog;

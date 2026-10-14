import { useState } from "react";
import { Button, ButtonGroup, Card, Col, Container, Row } from "react-bootstrap";
import HeroPagina from "../components/molecules/HeroPagina";
import recursosBiblioteca from "../data/biblioteca";

const categorias = ["Todos", "Aprendizaje", "Guías", "Historia"];

function Biblioteca() {
  const [categoria, setCategoria] = useState("Todos");
  const recursos = categoria === "Todos" ? recursosBiblioteca : recursosBiblioteca.filter((recurso) => recurso.categoria === categoria);
  return (
    <>
      <HeroPagina etiqueta="Biblioteca pública" titulo="Recursos para aprender Tarot" descripcion="Consulta guías, resúmenes e historias pensadas para una primera etapa de aprendizaje." imagen="/imagenes/hero-biblioteca.png" />
      <section className="seccion-contenido"><Container>
        <ButtonGroup className="filtros-catalogo" aria-label="Filtrar recursos de biblioteca">{categorias.map((opcion) => <Button key={opcion} variant={categoria === opcion ? "ritual" : "ritual-outline"} aria-pressed={categoria === opcion} onClick={() => setCategoria(opcion)}>{opcion}</Button>)}</ButtonGroup>
        <p className="resultado-filtro" role="status">Mostrando {recursos.length} recursos.</p>
        <Row className="g-4">{recursos.map((recurso) => <Col md={6} lg={4} key={recurso.id}><Card className="tarjeta-ritual tarjeta-recurso h-100"><Card.Img src={recurso.imagen} alt={recurso.alt} /><Card.Body><p className="tipo-contenido">{recurso.categoria}</p><Card.Title as="h2">{recurso.titulo}</Card.Title><Card.Text>{recurso.descripcion}</Card.Text></Card.Body></Card></Col>)}</Row>
      </Container></section>
    </>
  );
}

export default Biblioteca;

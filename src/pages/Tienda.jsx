import { useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import HeroPagina from "../components/molecules/HeroPagina";
import TarjetaProducto from "../components/molecules/TarjetaProducto";
import productos, { categoriasProductos } from "../data/productos";

function Tienda() {
  const [categoria, setCategoria] = useState("Todos");
  const visibles = categoria === "Todos" ? productos : productos.filter((producto) => producto.categoria === categoria);

  return (
    <>
      <HeroPagina etiqueta="Tienda ritual" titulo="Objetos para acompañar tu práctica" descripcion="Mazos, libros y elementos de bienestar reunidos en un catálogo simulado con stock local." imagen="/imagenes/hero-tienda.png" />
      <section className="seccion-contenido">
        <Container>
          <ButtonGroup className="filtros-catalogo" aria-label="Filtrar productos por categoría">
            {categoriasProductos.map((opcion) => <Button key={opcion} variant={categoria === opcion ? "ritual" : "ritual-outline"} aria-pressed={categoria === opcion} onClick={() => setCategoria(opcion)}>{opcion}</Button>)}
          </ButtonGroup>
          <p className="resultado-filtro" role="status">Mostrando {visibles.length} productos.</p>
          <Row className="g-4">{visibles.map((producto) => <Col md={6} lg={4} key={producto.id}><TarjetaProducto producto={producto} /></Col>)}</Row>
        </Container>
      </section>
    </>
  );
}

export default Tienda;

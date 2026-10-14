import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Precio from "../components/atoms/Precio";
import { useCarrito } from "../contexts/CarritoContext";
import experiencias from "../data/experiencias";
import NoEncontrada from "./NoEncontrada";

function DetalleExperiencia() {
  const { id } = useParams();
  const experiencia = experiencias.find((elemento) => elemento.id === id);
  const { agregar } = useCarrito();
  const [mensaje, setMensaje] = useState("");
  if (!experiencia) return <NoEncontrada />;

  function activarExperiencia() {
    if (experiencia.precio === 0) {
      setMensaje("La experiencia Una carta comenzó. Respira, formula tu pregunta y observa El Loco durante un minuto.");
      return;
    }
    const resultado = agregar({ ...experiencia, tipo: "experiencia", stock: null }, 1);
    setMensaje(resultado.mensaje);
  }

  return (
    <section className="seccion-contenido detalle-catalogo">
      <Container>
        <Link className="enlace-volver" to="/experiencias">← Volver a experiencias</Link>
        <Row className="g-5 align-items-center">
          <Col lg={5}><div className="detalle-catalogo__imagen"><img src={experiencia.imagen} alt={experiencia.alt} /></div></Col>
          <Col lg={7}>
            <p className="tipo-contenido">{experiencia.categoria}</p>
            <h1>{experiencia.nombre}</h1>
            <p className="texto-destacado">{experiencia.detalle}</p>
            <dl className="datos-detalle"><div><dt>Duración</dt><dd>{experiencia.duracion}</dd></div><div><dt>Valor</dt><dd><Precio valor={experiencia.precio} /></dd></div></dl>
            {mensaje && <Alert variant="ritual" role="status">{mensaje} {experiencia.precio > 0 && <Alert.Link as={Link} to="/carrito">Ver carrito</Alert.Link>}</Alert>}
            <Button variant="ritual" onClick={activarExperiencia}>{experiencia.precio === 0 ? "Comenzar experiencia" : "Agregar al carrito"}</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default DetalleExperiencia;

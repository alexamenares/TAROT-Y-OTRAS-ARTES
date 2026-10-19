/**
 * MOLÉCULA · Presentación de una experiencia en Inicio y Experiencias.
 * Recibe un objeto del catálogo; el enlace usa su id y Precio formatea el valor.
 * Agregar al carrito se realiza en la vista de detalle, no en esta tarjeta.
 */
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Precio from "../atoms/Precio";

function TarjetaExperiencia({ experiencia }) {
  return (
    <Card className="tarjeta-ritual tarjeta-catalogo h-100">
      <Card.Img src={experiencia.imagen} alt={experiencia.alt} />
      <Card.Body>
        <p className="tipo-contenido">{experiencia.categoria}</p>
        <Card.Title as="h2">{experiencia.nombre}</Card.Title>
        <Card.Text>{experiencia.descripcion}</Card.Text>
        <div className="tarjeta-catalogo__pie">
          <Precio valor={experiencia.precio} />
          <Button
            as={Link}
            to={`/experiencias/${experiencia.id}`}
            variant="ritual-outline"
          >
            Conocer experiencia
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaExperiencia;

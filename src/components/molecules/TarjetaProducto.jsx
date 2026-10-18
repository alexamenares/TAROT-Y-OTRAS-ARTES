/**
 * MOLÉCULA · Tarjeta reutilizable del catálogo de productos.
 * Recibe el producto completo y enlaza su detalle; el stock lo administra
 * carritoService cuando el usuario decide incorporarlo a su compra.
 */
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Precio from "../atoms/Precio";

function TarjetaProducto({ producto }) {
  return (
    <Card className="tarjeta-ritual tarjeta-catalogo h-100">
      <div className="tarjeta-producto__imagen">
        <Card.Img src={producto.imagen} alt={producto.alt} />
      </div>
      <Card.Body>
        <p className="tipo-contenido">{producto.categoria}</p>
        <Card.Title as="h2">{producto.nombre}</Card.Title>
        <Card.Text>{producto.descripcion}</Card.Text>
        <div className="tarjeta-catalogo__pie">
          <Precio valor={producto.precio} />
          <Button
            as={Link}
            to={`/tienda/${producto.id}`}
            variant="ritual-outline"
          >
            Ver producto
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TarjetaProducto;

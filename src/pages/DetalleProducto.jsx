/**
 * RUTA /tienda/:id · Busca el producto por id y muestra su stock simulado.
 * Agregar delega en CarritoContext: el servicio decide si acepta la cantidad.
 * El mensaje devuelto permite distinguir el éxito de un límite de stock.
 */
import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Precio from "../components/atoms/Precio";
import { useCarrito } from "../contexts/CarritoContext";
import productos from "../data/productos";
import NoEncontrada from "./NoEncontrada";

function DetalleProducto() {
  const { id } = useParams();
  const producto = productos.find((elemento) => elemento.id === id);
  const { agregar } = useCarrito();
  const [mensaje, setMensaje] = useState(null);
  if (!producto) return <NoEncontrada />;

  function agregarProducto() {
    setMensaje(agregar({ ...producto, tipo: "producto" }, 1));
  }

  return (
    <section className="seccion-contenido detalle-catalogo">
      <Container>
        <Link className="enlace-volver" to="/tienda">
          ← Volver a la tienda
        </Link>
        <Row className="g-5 align-items-center">
          <Col lg={6}>
            <div className="detalle-catalogo__imagen detalle-catalogo__imagen--producto">
              <img src={producto.imagen} alt={producto.alt} />
            </div>
          </Col>
          <Col lg={6}>
            <p className="tipo-contenido">{producto.categoria}</p>
            <h1>{producto.nombre}</h1>
            <p className="texto-destacado">{producto.descripcion}</p>
            <dl className="datos-detalle">
              <div>
                <dt>Precio</dt>
                <dd>
                  <Precio valor={producto.precio} />
                </dd>
              </div>
              <div>
                <dt>Stock</dt>
                <dd>{producto.stock} unidades</dd>
              </div>
            </dl>
            {mensaje && (
              <Alert
                variant={mensaje.exito ? "ritual" : "danger"}
                role="status"
              >
                {mensaje.mensaje}{" "}
                {mensaje.exito && (
                  <Alert.Link as={Link} to="/carrito">
                    Ver carrito
                  </Alert.Link>
                )}
              </Alert>
            )}
            <Button variant="ritual" onClick={agregarProducto}>
              Agregar al carrito
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default DetalleProducto;

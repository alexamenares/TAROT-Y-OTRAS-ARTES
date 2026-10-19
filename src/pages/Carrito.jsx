/**
 * RUTA /carrito · Un mismo carrito contiene productos y experiencias.
 * GrupoCarrito solo los presenta; CarritoContext ejecuta los cambios.
 * El modal pide confirmar la eliminación y el resumen calcula el subtotal.
 * El despacho se determina después, en FinalizarCompra.
 */
import { useState } from "react";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ControlCantidad from "../components/molecules/ControlCantidad";
import HeroPagina from "../components/molecules/HeroPagina";
import { useCarrito } from "../contexts/CarritoContext";
import { formatearPrecio } from "../utils/formato";

// Componente de presentación: recibe callbacks del padre y no posee otro carrito.
function GrupoCarrito({ titulo, lineas, onCambiar, onQuitar }) {
  if (lineas.length === 0) return null;
  const idTitulo = `grupo-${titulo.toLowerCase()}`;
  return (
    <section className="grupo-carrito" aria-labelledby={idTitulo}>
      <h2 id={idTitulo}>{titulo}</h2>
      {lineas.map((linea) => (
        <article className="fila-carrito" key={`${linea.tipo}-${linea.id}`}>
          <img
            className="fila-carrito__imagen"
            src={linea.imagen}
            alt={linea.alt}
          />
          <div className="fila-carrito__detalle">
            <p className="tipo-contenido">{linea.tipo}</p>
            <h3 className="fila-carrito__nombre">{linea.nombre}</h3>
            <p>{formatearPrecio(linea.precio)} por unidad</p>
            {linea.stock !== null && linea.cantidad === linea.stock && (
              <small>Alcanzaste el stock máximo de {linea.stock}.</small>
            )}
          </div>
          <ControlCantidad
            cantidad={linea.cantidad}
            maximo={linea.stock}
            nombre={linea.nombre}
            onRestar={() => onCambiar(linea, linea.cantidad - 1)}
            onSumar={() => onCambiar(linea, linea.cantidad + 1)}
          />
          <strong className="fila-carrito__precio">
            {formatearPrecio(linea.precio * linea.cantidad)}
          </strong>
          <button
            className="boton-eliminar"
            type="button"
            onClick={() => onQuitar(linea)}
            aria-label={`Quitar ${linea.nombre}`}
          >
            ×
          </button>
        </article>
      ))}
    </section>
  );
}

function Carrito() {
  const { lineas, cambiarCantidad, eliminar, subtotal } = useCarrito();
  const [lineaAEliminar, setLineaAEliminar] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const experiencias = lineas.filter((linea) => linea.tipo === "experiencia");
  const productos = lineas.filter((linea) => linea.tipo === "producto");

  function cambiar(linea, cantidad) {
    const resultado = cambiarCantidad(linea.tipo, linea.id, cantidad);
    setMensaje(resultado.exito ? "Cantidad actualizada." : resultado.mensaje);
  }

  function confirmarEliminacion() {
    eliminar(lineaAEliminar.tipo, lineaAEliminar.id);
    setMensaje(`${lineaAEliminar.nombre} fue quitado del carrito.`);
    setLineaAEliminar(null);
  }

  return (
    <>
      <HeroPagina
        etiqueta="Compra única"
        titulo="Tu carrito ritual"
        descripcion="Experiencias y productos reunidos en un solo lugar, con cantidades y total transparentes."
        imagen="/imagenes/hero-carrito.png"
      />
      <section className="seccion-contenido">
        <Container>
          {mensaje && (
            <Alert
              variant="ritual"
              dismissible
              onClose={() => setMensaje("")}
              role="status"
            >
              {mensaje}
            </Alert>
          )}
          {lineas.length === 0 ? (
            <div className="estado-vacio">
              <h2>Tu carrito está vacío</h2>
              <p>Aún no has agregado experiencias pagadas ni productos.</p>
              <div className="grupo-acciones">
                <Button as={Link} to="/experiencias" variant="ritual">
                  Explorar experiencias
                </Button>
                <Button as={Link} to="/tienda" variant="ritual-outline">
                  Visitar la tienda
                </Button>
              </div>
            </div>
          ) : (
            <Row className="g-4 align-items-start">
              <Col lg={8}>
                <GrupoCarrito
                  titulo="Experiencias"
                  lineas={experiencias}
                  onCambiar={cambiar}
                  onQuitar={setLineaAEliminar}
                />
                <GrupoCarrito
                  titulo="Productos"
                  lineas={productos}
                  onCambiar={cambiar}
                  onQuitar={setLineaAEliminar}
                />
              </Col>
              <Col lg={4}>
                <aside className="resumen-carrito">
                  <p className="tipo-contenido">Compra única</p>
                  <h2>Resumen</h2>
                  <dl>
                    <div>
                      <dt>Subtotal</dt>
                      <dd>{formatearPrecio(subtotal)}</dd>
                    </div>
                    <div>
                      <dt>Despacho</dt>
                      <dd>Se calcula al finalizar</dd>
                    </div>
                    <div className="total">
                      <dt>Total provisorio</dt>
                      <dd>{formatearPrecio(subtotal)}</dd>
                    </div>
                  </dl>
                  <Button
                    as={Link}
                    to="/finalizar-compra"
                    variant="ritual"
                    className="w-100"
                  >
                    Finalizar compra
                  </Button>
                </aside>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Modal
        show={Boolean(lineaAEliminar)}
        onHide={() => setLineaAEliminar(null)}
        centered
        className="modal-ritual"
      >
        <Modal.Header closeButton>
          <Modal.Title>Quitar del carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Deseas quitar {lineaAEliminar?.nombre} de la compra?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="ritual-outline"
            onClick={() => setLineaAEliminar(null)}
          >
            Cancelar
          </Button>
          <Button variant="ritual" onClick={confirmarEliminacion}>
            Quitar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Carrito;

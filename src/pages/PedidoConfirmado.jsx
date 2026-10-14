import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerUltimoPedido } from "../services/pedidoService";
import { formatearPrecio } from "../utils/formato";

function PedidoConfirmado() {
  const pedido = obtenerUltimoPedido();
  return (
    <section className="seccion-contenido pagina-confirmacion"><Container>
      {pedido ? <article className="confirmacion-pedido"><p className="tipo-contenido">Pedido simulado confirmado</p><h1>Gracias por tu compra</h1><p className="numero-pedido">{pedido.numero}</p><p>Guardamos temporalmente el resumen en esta sesión. No se realizó ningún cobro ni despacho real.</p><dl><div><dt>Cliente</dt><dd>{pedido.cliente.nombre}</dd></div><div><dt>Entrega</dt><dd>{pedido.entrega}</dd></div><div><dt>Total</dt><dd>{formatearPrecio(pedido.total)}</dd></div></dl><Button as={Link} to="/" variant="ritual">Volver al inicio</Button></article> : <div className="estado-vacio"><h1>No hay un pedido reciente</h1><p>Completa una compra simulada para ver su comprobante.</p><Button as={Link} to="/tienda" variant="ritual">Ir a la tienda</Button></div>}
    </Container></section>
  );
}

export default PedidoConfirmado;

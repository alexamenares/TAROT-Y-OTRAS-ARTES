import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoEncontrada() {
  return <section className="seccion-contenido pagina-no-encontrada"><Container><p className="tipo-contenido">Error 404</p><h1>Esta página no está en la baraja</h1><p>La dirección no existe o el contenido fue movido.</p><Button as={Link} to="/" variant="ritual">Volver al inicio</Button></Container></section>;
}

export default NoEncontrada;

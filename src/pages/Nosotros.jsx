import { Col, Container, Row } from "react-bootstrap";
import HeroPagina from "../components/molecules/HeroPagina";

function Nosotros() {
  return (
    <>
      <HeroPagina etiqueta="Nosotros" titulo="Un proyecto académico con mirada espiritual" descripcion="Tarot y Otras Artes organiza experiencias, recursos y contenidos simulados para aprender frontend y explorar el simbolismo con responsabilidad." imagen="/imagenes/hero-nosotros.png" />
      <section className="seccion-contenido"><Container><Row className="g-4 align-items-stretch">
        <Col lg={6}><article className="tarjeta-ritual bloque-nosotros h-100"><p className="tipo-contenido">Propósito</p><h2>Acompañar el aprendizaje y la reflexión</h2><p>Este sitio demuestra una experiencia completa de navegación, estado, formularios y compra simulada sin presentar el Tarot como sustituto de orientación médica, psicológica, legal o financiera.</p><p>La migración a React separa datos, servicios y componentes para facilitar una futura integración con microservicios.</p></article></Col>
        <Col lg={6}><article className="tarjeta-ritual bloque-nosotros h-100"><p className="tipo-contenido">Video de presentación</p><h2>Tarot como lenguaje visual</h2><p>Una introducción breve a la propuesta y a su uso responsable.</p><video controls preload="metadata" poster="/imagenes/hero-nosotros.png"><source src="/videos/Tarot-1-minuto.mp4" type="video/mp4" />Tu navegador no puede reproducir este video.</video></article></Col>
      </Row></Container></section>
    </>
  );
}

export default Nosotros;

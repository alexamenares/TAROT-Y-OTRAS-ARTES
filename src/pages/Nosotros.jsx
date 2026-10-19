/**
 * RUTA /nosotros · Propósito del proyecto y video local de presentación.
 * El video vive en public/Videos; el navegador lo reproduce mediante controles
 * nativos. errorVideo permite ofrecer un mensaje si falla la carga del archivo.
 */
import { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import HeroPagina from "../components/molecules/HeroPagina";

function Nosotros() {
  const [errorVideo, setErrorVideo] = useState(false);
  // public se sirve desde la raíz: «Videos» debe respetar las mayúsculas
  // del archivo real, especialmente cuando el hosting utiliza Linux.
  const rutaVideo = `${import.meta.env.BASE_URL}Videos/Tarot-1-minuto.mp4`;
  return (
    <>
      <HeroPagina
        etiqueta="Nosotros"
        titulo="Un proyecto académico con mirada espiritual"
        descripcion="Tarot y Otras Artes organiza experiencias, recursos y contenidos simulados para aprender frontend y explorar el simbolismo con responsabilidad."
        imagen="/imagenes/hero-nosotros.png"
      />
      <section className="seccion-contenido">
        <Container>
          <Row className="g-4 align-items-stretch">
            <Col lg={6}>
              <article className="tarjeta-ritual bloque-nosotros h-100">
                <p className="tipo-contenido">Propósito</p>
                <h2>Acompañar el aprendizaje y la reflexión</h2>
                <p>
                  Este sitio demuestra una experiencia completa de navegación,
                  estado, formularios y compra simulada sin presentar el Tarot
                  como sustituto de orientación médica, psicológica, legal o
                  financiera.
                </p>
                <p>
                  La migración a React separa datos, servicios y componentes
                  para facilitar una futura integración con microservicios.
                </p>
              </article>
            </Col>
            <Col lg={6}>
              <article className="tarjeta-ritual bloque-nosotros h-100">
                <p className="tipo-contenido">Video de presentación</p>
                <h2>Tarot como lenguaje visual</h2>
                <p>
                  Una introducción breve a la propuesta y a su uso responsable.
                </p>
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster="/imagenes/hero-nosotros.png"
                  aria-label="Video de presentación de Tarot y Otras Artes"
                  onError={() => setErrorVideo(true)}
                >
                  <source
                    src={rutaVideo}
                    type="video/mp4"
                    onError={() => setErrorVideo(true)}
                  />
                  Tu navegador no puede reproducir este video.
                </video>
                {errorVideo && (
                  <Alert variant="danger" role="alert">
                    No pudimos reproducir el video. Puedes abrir el archivo
                    desde el enlace inferior.
                  </Alert>
                )}
                <p className="mt-3">
                  <a href={rutaVideo} target="_blank" rel="noreferrer">
                    Abrir video MP4 en otra pestaña
                  </a>
                </p>
              </article>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Nosotros;

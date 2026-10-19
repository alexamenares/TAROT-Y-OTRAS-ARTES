/**
 * RUTA /contacto · datos guarda el formulario; errores contiene sus mensajes.
 * cambiar valida al escribir y enviar revisa todos los campos antes del éxito.
 * No envía correos ni peticiones: resultado solo muestra la respuesta simulada.
 */
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import MensajeCampo from "../components/atoms/MensajeCampo";
import HeroPagina from "../components/molecules/HeroPagina";
import { correoValido } from "../utils/formato";

const inicial = { nombre: "", correo: "", asunto: "", mensaje: "" };

function Contacto() {
  const [datos, setDatos] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [resultado, setResultado] = useState(null);

  function validar(campo, valor) {
    if (campo === "nombre" && (!valor.trim() || valor.length > 120))
      return "Ingresa tu nombre completo.";
    if (campo === "correo" && (!correoValido(valor) || valor.length > 254))
      return "Ingresa un correo electrónico válido.";
    if (campo === "asunto" && (!valor.trim() || valor.length > 80))
      return "Ingresa un asunto de máximo 80 caracteres.";
    if (campo === "mensaje" && (valor.trim().length < 10 || valor.length > 500))
      return "El mensaje debe contener entre 10 y 500 caracteres.";
    return "";
  }

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: validar(name, value) }));
    setResultado(null);
  }

  function enviar(evento) {
    evento.preventDefault();
    const siguientes = Object.fromEntries(
      Object.entries(datos).map(([campo, valor]) => [
        campo,
        validar(campo, valor),
      ]),
    );
    setErrores(siguientes);
    if (Object.values(siguientes).some(Boolean)) {
      setResultado({
        tipo: "danger",
        mensaje: "Revisa los campos marcados antes de enviar tu mensaje.",
      });
      return;
    }
    setResultado({
      tipo: "ritual",
      mensaje: "Mensaje enviado correctamente en modo simulado.",
    });
    setDatos(inicial);
    setErrores({});
  }

  return (
    <>
      <HeroPagina
        etiqueta="Contacto"
        titulo="Cuéntanos qué necesitas"
        descripcion="Completa el formulario y revisa los mensajes en tiempo real. El envío continúa siendo simulado."
        imagen="/imagenes/hero-contacto.png"
      />
      <section className="seccion-contenido">
        <Container>
          <Row className="g-4">
            <Col lg={8}>
              <Form className="formulario-ritual" noValidate onSubmit={enviar}>
                <h2>Formulario de contacto</h2>
                {[
                  ["nombre", "Nombre completo", "text", 120],
                  ["correo", "Correo electrónico", "email", 254],
                  ["asunto", "Asunto", "text", 80],
                ].map(([campo, etiqueta, tipo, maximo]) => (
                  <Form.Group
                    className="mb-3"
                    controlId={`contacto-${campo}`}
                    key={campo}
                  >
                    <Form.Label>{etiqueta}</Form.Label>
                    <Form.Control
                      name={campo}
                      type={tipo}
                      maxLength={maximo}
                      value={datos[campo]}
                      onChange={cambiar}
                      isInvalid={Boolean(errores[campo])}
                    />
                    <MensajeCampo mensaje={errores[campo]} />
                  </Form.Group>
                ))}
                <Form.Group className="mb-4" controlId="contacto-mensaje">
                  <Form.Label>Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="mensaje"
                    maxLength={500}
                    value={datos.mensaje}
                    onChange={cambiar}
                    isInvalid={Boolean(errores.mensaje)}
                  />
                  <MensajeCampo mensaje={errores.mensaje} />
                </Form.Group>
                {resultado && (
                  <Alert variant={resultado.tipo} role="status">
                    {resultado.mensaje}
                  </Alert>
                )}
                <Button type="submit" variant="ritual">
                  Enviar mensaje simulado
                </Button>
              </Form>
            </Col>
            <Col lg={4}>
              <aside className="tarjeta-ritual datos-contacto">
                <p className="tipo-contenido">Atención simulada</p>
                <h2>Canales del MVP</h2>
                <p>
                  <strong>Correo</strong>
                  <br />
                  contacto@tarotyotrasartes.cl
                </p>
                <p>
                  <strong>Horario</strong>
                  <br />
                  Lunes a viernes, 10:00 a 18:00
                </p>
                <p>No se envían mensajes reales en esta etapa.</p>
              </aside>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Contacto;

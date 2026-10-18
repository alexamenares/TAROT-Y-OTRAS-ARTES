/**
 * RUTA /ingresar (también /login) · Acceso de demostración, sin autenticación real.
 * Las validaciones revisan formato y longitud. SesionContext conserva nombre
 * y correo, nunca la contraseña. location.state.desde permite retomar la ruta
 * protegida que se había solicitado antes de ingresar.
 */
import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MensajeCampo from "../components/atoms/MensajeCampo";
import HeroPagina from "../components/molecules/HeroPagina";
import { useSesion } from "../contexts/SesionContext";
import { correoValido } from "../utils/formato";

function Ingresar() {
  const { ingresar } = useSesion();
  const navigate = useNavigate();
  const location = useLocation();
  const [datos, setDatos] = useState({ correo: "", contrasena: "" });
  const [errores, setErrores] = useState({});

  function validar(campo, valor) {
    if (campo === "correo" && !correoValido(valor))
      return "Ingresa un correo electrónico válido.";
    if (campo === "contrasena" && (valor.length < 8 || valor.length > 72))
      return "La contraseña debe contener entre 8 y 72 caracteres.";
    return "";
  }

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
    setErrores((actuales) => ({ ...actuales, [name]: validar(name, value) }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const siguientes = {
      correo: validar("correo", datos.correo),
      contrasena: validar("contrasena", datos.contrasena),
    };
    setErrores(siguientes);
    if (Object.values(siguientes).some(Boolean)) return;
    ingresar({
      nombre: datos.correo.split("@")[0],
      correo: datos.correo.trim(),
    });
    navigate(location.state?.desde || "/agenda", { replace: true });
  }

  return (
    <>
      <HeroPagina
        etiqueta="Tu espacio personal"
        titulo="Ingresa a tu cuenta"
        descripcion="Retoma tus experiencias, reservas y momentos de reflexión."
        imagen="/imagenes/hero-ingresar.png"
      />
      <section className="seccion-contenido">
        <Container className="contenedor-formulario">
          <Form className="formulario-ritual" noValidate onSubmit={enviar}>
            <h2>Bienvenido nuevamente</h2>
            <p>
              Usa cualquier correo válido y una contraseña de al menos 8
              caracteres.
            </p>
            {location.state?.desde && (
              <Alert variant="ritual">
                Inicia sesión para acceder a la agenda y tus reservas.
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="login-correo">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                name="correo"
                type="email"
                autoComplete="email"
                value={datos.correo}
                onChange={cambiar}
                isInvalid={Boolean(errores.correo)}
              />
              <MensajeCampo mensaje={errores.correo} />
            </Form.Group>
            <Form.Group className="mb-4" controlId="login-contrasena">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="contrasena"
                type="password"
                autoComplete="current-password"
                value={datos.contrasena}
                onChange={cambiar}
                isInvalid={Boolean(errores.contrasena)}
              />
              <MensajeCampo mensaje={errores.contrasena} />
            </Form.Group>
            <Button type="submit" variant="ritual">
              Ingresar
            </Button>
            <p className="enlace-registro">
              ¿Aún no tienes una cuenta?{" "}
              <Link to="/registro" state={{ desdeIngreso: true }}>
                Crea tu cuenta
              </Link>
            </p>
          </Form>
        </Container>
      </section>
    </>
  );
}

export default Ingresar;

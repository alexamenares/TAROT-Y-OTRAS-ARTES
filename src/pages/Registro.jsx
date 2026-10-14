import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import MensajeCampo from "../components/atoms/MensajeCampo";
import { useSesion } from "../contexts/SesionContext";
import { correoValido } from "../utils/formato";

function Registro() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ingresar } = useSesion();
  const [datos, setDatos] = useState({ nombre: "", correo: "", contrasena: "", confirmar: "", acepta: false });
  const [errores, setErrores] = useState({});
  if (!location.state?.desdeIngreso) return <Navigate to="/ingresar" replace />;

  function validar(campo, valor, estado = datos) {
    if (campo === "nombre" && (!valor.trim() || valor.length > 120)) return "Ingresa tu nombre completo.";
    if (campo === "correo" && (!correoValido(valor) || valor.length > 254)) return "Ingresa un correo electrónico válido.";
    if (campo === "contrasena" && (valor.length < 8 || valor.length > 72)) return "La contraseña debe contener entre 8 y 72 caracteres.";
    if (campo === "confirmar" && valor !== estado.contrasena) return "Las contraseñas no coinciden.";
    if (campo === "acepta" && !valor) return "Debes aceptar el tratamiento de datos para continuar.";
    return "";
  }

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    const nuevoValor = type === "checkbox" ? checked : value;
    const siguiente = { ...datos, [name]: nuevoValor };
    setDatos(siguiente);
    setErrores((actuales) => ({ ...actuales, [name]: validar(name, nuevoValor, siguiente), ...(name === "contrasena" && datos.confirmar ? { confirmar: validar("confirmar", datos.confirmar, siguiente) } : {}) }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const siguientes = Object.fromEntries(Object.entries(datos).map(([campo, valor]) => [campo, validar(campo, valor, datos)]));
    setErrores(siguientes);
    if (Object.values(siguientes).some(Boolean)) return;
    ingresar({ nombre: datos.nombre.trim(), correo: datos.correo.trim() });
    navigate("/agenda", { replace: true });
  }

  return (
    <section className="seccion-contenido pagina-registro"><Container className="contenedor-formulario"><Form className="formulario-ritual" noValidate onSubmit={enviar}><p className="tipo-contenido">Comienza tu camino</p><h1>Crea tu cuenta</h1><p>El registro es simulado y existe únicamente como continuación del ingreso.</p>
      {[ ["nombre", "Nombre completo", "text", "name"], ["correo", "Correo electrónico", "email", "email"], ["contrasena", "Contraseña", "password", "new-password"], ["confirmar", "Confirmar contraseña", "password", "new-password"] ].map(([campo, etiqueta, tipo, autocomplete]) => <Form.Group className="mb-3" controlId={`registro-${campo}`} key={campo}><Form.Label>{etiqueta}</Form.Label><Form.Control name={campo} type={tipo} autoComplete={autocomplete} value={datos[campo]} onChange={cambiar} isInvalid={Boolean(errores[campo])} /><MensajeCampo mensaje={errores[campo]} /></Form.Group>)}
      <Form.Group className="mb-4" controlId="registro-acepta"><Form.Check name="acepta" checked={datos.acepta} onChange={cambiar} label="Acepto el tratamiento de mis datos para esta cuenta simulada." isInvalid={Boolean(errores.acepta)} /><MensajeCampo mensaje={errores.acepta} /></Form.Group>
      <Button type="submit" variant="ritual">Crear cuenta y continuar</Button><p className="enlace-registro">¿Ya tienes una cuenta? <Link to="/ingresar">Ingresa aquí</Link></p>
    </Form></Container></section>
  );
}

export default Registro;

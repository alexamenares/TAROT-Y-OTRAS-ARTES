/**
 * RUTA /finalizar-compra · Formulario controlado y resumen de compra.
 * Solo los productos físicos permiten elegir retiro o despacho. Despacho
 * requiere dirección y añade $3.990; una compra digital no pide domicilio.
 * enviar valida, guarda el pedido, vacía el carrito y abre la confirmación.
 */
import { useRef, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MensajeCampo from "../components/atoms/MensajeCampo";
import HeroPagina from "../components/molecules/HeroPagina";
import { useCarrito } from "../contexts/CarritoContext";
import { useSesion } from "../contexts/SesionContext";
import { crearPedido } from "../services/pedidoService";
import { correoValido, formatearPrecio } from "../utils/formato";

const comunas = {
  Metropolitana: ["Santiago", "Providencia", "Maipú"],
  Valparaíso: ["Valparaíso", "Viña del Mar", "Quilpué"],
  Biobío: ["Concepción", "Talcahuano", "Los Ángeles"],
};

function FinalizarCompra() {
  const { lineas, subtotal, contieneProductos, vaciar } = useCarrito();
  const { usuario } = useSesion();
  const navigate = useNavigate();
  /* Las referencias permiten enfocar el primer error sin consultar ni manipular el DOM directamente. */
  const referencias = useRef({});
  const [datos, setDatos] = useState({
    nombre: usuario?.nombre || "",
    correo: usuario?.correo || "",
    entrega: "Retiro",
    region: "",
    comuna: "",
    direccion: "",
    referencia: "",
  });
  const [errores, setErrores] = useState({});
  const requiereDireccion = contieneProductos && datos.entrega === "Despacho";
  const costoDespacho = requiereDireccion ? 3990 : 0;

  // Validación por campo: las reglas de domicilio solo aplican al despacho.
  function validar(campo, valor, estado = datos) {
    if (campo === "nombre" && valor.trim().length < 3)
      return "Escribe un nombre de al menos 3 caracteres.";
    if (campo === "correo" && !correoValido(valor))
      return "Ingresa un correo electrónico válido.";
    if (requiereDireccion && campo === "region" && !valor)
      return "Selecciona una región.";
    if (requiereDireccion && campo === "comuna" && !valor)
      return "Selecciona una comuna.";
    if (requiereDireccion && campo === "direccion" && valor.trim().length < 5)
      return "Escribe una dirección de al menos 5 caracteres.";
    if (
      campo === "comuna" &&
      estado.region &&
      !comunas[estado.region]?.includes(valor)
    )
      return "Selecciona una comuna disponible.";
    return "";
  }

  // Al cambiar región se limpia comuna: una comuna no sirve para otra región.
  function cambiar(evento) {
    const { name, value } = evento.target;
    const siguiente = { ...datos, [name]: value };
    if (name === "region") siguiente.comuna = "";
    if (name === "entrega" && value !== "Despacho")
      Object.assign(siguiente, {
        region: "",
        comuna: "",
        direccion: "",
        referencia: "",
      });
    setDatos(siguiente);
    setErrores((actuales) => ({
      ...actuales,
      [name]: validar(name, value, siguiente),
      ...(name === "region" ? { comuna: "" } : {}),
    }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const campos = [
      "nombre",
      "correo",
      ...(requiereDireccion ? ["region", "comuna", "direccion"] : []),
    ];
    const siguientesErrores = Object.fromEntries(
      campos.map((campo) => [campo, validar(campo, datos[campo])]),
    );
    setErrores(siguientesErrores);
    const primerCampo = campos.find((campo) => siguientesErrores[campo]);
    if (primerCampo) {
      referencias.current[primerCampo]?.focus();
      return;
    }

    // Primero conservamos la compra. Solo después limpiamos el carrito.
    crearPedido({
      cliente: { nombre: datos.nombre.trim(), correo: datos.correo.trim() },
      entrega: contieneProductos ? datos.entrega : "Digital",
      direccion: requiereDireccion
        ? {
            region: datos.region,
            comuna: datos.comuna,
            direccion: datos.direccion.trim(),
            referencia: datos.referencia.trim(),
          }
        : null,
      lineas,
      subtotal,
      despacho: costoDespacho,
      total: subtotal + costoDespacho,
    });
    vaciar();
    navigate("/pedido-confirmado");
  }

  return (
    <>
      <HeroPagina
        etiqueta="Paso final"
        titulo="Finalizar compra"
        descripcion="Revisa tus datos y elige la entrega cuando el pedido incluye productos físicos."
        imagen="/imagenes/hero-carrito.png"
      />
      <section className="seccion-contenido">
        <Container>
          <Alert variant="ritual">
            <strong>Compra:</strong> (no se realizará ningún cobro).
          </Alert>
          {lineas.length === 0 ? (
            <div className="estado-vacio">
              <h2>No hay elementos para finalizar</h2>
              <Button as={Link} to="/carrito" variant="ritual">
                Volver al carrito
              </Button>
            </div>
          ) : (
            <Row className="g-4 align-items-start">
              <Col lg={8}>
                <Form
                  className="formulario-ritual"
                  noValidate
                  onSubmit={enviar}
                >
                  <h2>Datos de contacto</h2>
                  <Form.Group className="mb-3" controlId="checkoutNombre">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                      ref={(elemento) => {
                        referencias.current.nombre = elemento;
                      }}
                      name="nombre"
                      value={datos.nombre}
                      onChange={cambiar}
                      isInvalid={Boolean(errores.nombre)}
                      autoComplete="name"
                    />
                    <MensajeCampo
                      id="error-checkout-nombre"
                      mensaje={errores.nombre}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="checkoutCorreo">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                      ref={(elemento) => {
                        referencias.current.correo = elemento;
                      }}
                      name="correo"
                      type="email"
                      value={datos.correo}
                      onChange={cambiar}
                      isInvalid={Boolean(errores.correo)}
                      autoComplete="email"
                    />
                    <MensajeCampo
                      id="error-checkout-correo"
                      mensaje={errores.correo}
                    />
                  </Form.Group>

                  {contieneProductos ? (
                    <>
                      <h2>Forma de entrega</h2>
                      <div className="opciones-entrega">
                        <Form.Check
                          type="radio"
                          id="retiro"
                          name="entrega"
                          value="Retiro"
                          label="Retiro · $0"
                          checked={datos.entrega === "Retiro"}
                          onChange={cambiar}
                        />
                        <Form.Check
                          type="radio"
                          id="despacho"
                          name="entrega"
                          value="Despacho"
                          label="Despacho estándar · $3.990"
                          checked={datos.entrega === "Despacho"}
                          onChange={cambiar}
                        />
                      </div>
                      {requiereDireccion && (
                        <div className="campos-direccion">
                          <Form.Group
                            className="mb-3"
                            controlId="checkoutRegion"
                          >
                            <Form.Label>Región</Form.Label>
                            <Form.Select
                              ref={(elemento) => {
                                referencias.current.region = elemento;
                              }}
                              name="region"
                              value={datos.region}
                              onChange={cambiar}
                              isInvalid={Boolean(errores.region)}
                            >
                              <option value="">Selecciona una región</option>
                              {Object.keys(comunas).map((region) => (
                                <option key={region}>{region}</option>
                              ))}
                            </Form.Select>
                            <MensajeCampo mensaje={errores.region} />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="checkoutComuna"
                          >
                            <Form.Label>Comuna</Form.Label>
                            <Form.Select
                              ref={(elemento) => {
                                referencias.current.comuna = elemento;
                              }}
                              name="comuna"
                              value={datos.comuna}
                              onChange={cambiar}
                              disabled={!datos.region}
                              isInvalid={Boolean(errores.comuna)}
                            >
                              <option value="">Selecciona una comuna</option>
                              {(comunas[datos.region] || []).map((comuna) => (
                                <option key={comuna}>{comuna}</option>
                              ))}
                            </Form.Select>
                            <MensajeCampo mensaje={errores.comuna} />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="checkoutDireccion"
                          >
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                              ref={(elemento) => {
                                referencias.current.direccion = elemento;
                              }}
                              name="direccion"
                              value={datos.direccion}
                              onChange={cambiar}
                              isInvalid={Boolean(errores.direccion)}
                              autoComplete="street-address"
                            />
                            <MensajeCampo mensaje={errores.direccion} />
                          </Form.Group>
                          <Form.Group
                            className="mb-4"
                            controlId="checkoutReferencia"
                          >
                            <Form.Label>
                              Referencia <span>(opcional)</span>
                            </Form.Label>
                            <Form.Control
                              name="referencia"
                              value={datos.referencia}
                              onChange={cambiar}
                              autoComplete="address-line2"
                            />
                          </Form.Group>
                        </div>
                      )}
                    </>
                  ) : (
                    <Alert variant="ritual">
                      Tu carrito contiene solo experiencias. La entrega será
                      digital.
                    </Alert>
                  )}
                  <Button type="submit" variant="ritual">
                    Confirmar pedido
                  </Button>
                </Form>
              </Col>
              <Col lg={4}>
                <aside className="resumen-carrito">
                  <h2>Resumen del pedido</h2>
                  <ul>
                    {lineas.map((linea) => (
                      <li key={`${linea.tipo}-${linea.id}`}>
                        <span>
                          {linea.nombre} × {linea.cantidad}
                        </span>
                        <strong>
                          {formatearPrecio(linea.precio * linea.cantidad)}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <dl>
                    <div>
                      <dt>Subtotal</dt>
                      <dd>{formatearPrecio(subtotal)}</dd>
                    </div>
                    <div>
                      <dt>Despacho</dt>
                      <dd>{formatearPrecio(costoDespacho)}</dd>
                    </div>
                    <div className="total">
                      <dt>Total</dt>
                      <dd>{formatearPrecio(subtotal + costoDespacho)}</dd>
                    </div>
                  </dl>
                </aside>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
}

export default FinalizarCompra;

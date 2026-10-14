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
  "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
  "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
  "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
  "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
  "Valparaíso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
  "Metropolitana de Santiago": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
  "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
  "Maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
  "Ñuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
  "Biobío": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
  "La Araucanía": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
  "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
  "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
  "Aysén": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
  "Magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"],
};

function FinalizarCompra() {
  const { lineas, subtotal, contieneProductos, vaciar } = useCarrito();
  const { usuario } = useSesion();
  const navigate = useNavigate();
  /* Las referencias permiten enfocar el primer error sin consultar ni manipular el DOM directamente. */
  const referencias = useRef({});
  const [datos, setDatos] = useState({ nombre: usuario?.nombre || "", correo: usuario?.correo || "", entrega: "Retiro", region: "", comuna: "", direccion: "", referencia: "" });
  const [errores, setErrores] = useState({});
  const requiereDireccion = contieneProductos && datos.entrega === "Despacho";
  const costoDespacho = requiereDireccion ? 3990 : 0;

  function validar(campo, valor, estado = datos) {
    if (campo === "nombre" && valor.trim().length < 3) return "Escribe un nombre de al menos 3 caracteres.";
    if (campo === "correo" && !correoValido(valor)) return "Ingresa un correo electrónico válido.";
    if (requiereDireccion && campo === "region" && !valor) return "Selecciona una región.";
    if (requiereDireccion && campo === "comuna" && !valor) return "Selecciona una comuna.";
    if (requiereDireccion && campo === "direccion" && valor.trim().length < 5) return "Escribe una dirección de al menos 5 caracteres.";
    if (campo === "comuna" && estado.region && !comunas[estado.region]?.includes(valor)) return "Selecciona una comuna disponible.";
    return "";
  }

  function cambiar(evento) {
    const { name, value } = evento.target;
    const siguiente = { ...datos, [name]: value };
    if (name === "region") siguiente.comuna = "";
    if (name === "entrega" && value !== "Despacho") Object.assign(siguiente, { region: "", comuna: "", direccion: "", referencia: "" });
    setDatos(siguiente);
    setErrores((actuales) => ({ ...actuales, [name]: validar(name, value, siguiente), ...(name === "region" ? { comuna: "" } : {}) }));
  }

  function enviar(evento) {
    evento.preventDefault();
    const campos = ["nombre", "correo", ...(requiereDireccion ? ["region", "comuna", "direccion"] : [])];
    const siguientesErrores = Object.fromEntries(campos.map((campo) => [campo, validar(campo, datos[campo])]));
    setErrores(siguientesErrores);
    const primerCampo = campos.find((campo) => siguientesErrores[campo]);
    if (primerCampo) {
      referencias.current[primerCampo]?.focus();
      return;
    }

    crearPedido({ cliente: { nombre: datos.nombre.trim(), correo: datos.correo.trim() }, entrega: contieneProductos ? datos.entrega : "Digital", direccion: requiereDireccion ? { region: datos.region, comuna: datos.comuna, direccion: datos.direccion.trim(), referencia: datos.referencia.trim() } : null, lineas, subtotal, despacho: costoDespacho, total: subtotal + costoDespacho });
    vaciar();
    navigate("/pedido-confirmado");
  }

  return (
    <>
      <HeroPagina etiqueta="Paso final" titulo="Finalizar compra" descripcion="Revisa tus datos y elige la entrega cuando el pedido incluye productos físicos." imagen="/imagenes/hero-carrito.png" />
      <section className="seccion-contenido"><Container>
        <Alert variant="ritual"><strong>Compra simulada:</strong> no se realizará ningún cobro.</Alert>
        {lineas.length === 0 ? <div className="estado-vacio"><h2>No hay elementos para finalizar</h2><Button as={Link} to="/carrito" variant="ritual">Volver al carrito</Button></div> : (
          <Row className="g-4 align-items-start">
            <Col lg={8}><Form className="formulario-ritual" noValidate onSubmit={enviar}>
              <h2>Datos de contacto</h2>
              <Form.Group className="mb-3" controlId="checkoutNombre"><Form.Label>Nombre completo</Form.Label><Form.Control ref={(elemento) => { referencias.current.nombre = elemento; }} name="nombre" value={datos.nombre} onChange={cambiar} isInvalid={Boolean(errores.nombre)} autoComplete="name" /><MensajeCampo id="error-checkout-nombre" mensaje={errores.nombre} /></Form.Group>
              <Form.Group className="mb-4" controlId="checkoutCorreo"><Form.Label>Correo electrónico</Form.Label><Form.Control ref={(elemento) => { referencias.current.correo = elemento; }} name="correo" type="email" value={datos.correo} onChange={cambiar} isInvalid={Boolean(errores.correo)} autoComplete="email" /><MensajeCampo id="error-checkout-correo" mensaje={errores.correo} /></Form.Group>

              {contieneProductos ? <>
                <h2>Forma de entrega</h2>
                <div className="opciones-entrega">
                  <Form.Check type="radio" id="retiro" name="entrega" value="Retiro" label="Retiro · $0" checked={datos.entrega === "Retiro"} onChange={cambiar} />
                  <Form.Check type="radio" id="despacho" name="entrega" value="Despacho" label="Despacho estándar · $3.990" checked={datos.entrega === "Despacho"} onChange={cambiar} />
                </div>
                {requiereDireccion && <div className="campos-direccion">
                  <Form.Group className="mb-3" controlId="checkoutRegion"><Form.Label>Región</Form.Label><Form.Select ref={(elemento) => { referencias.current.region = elemento; }} name="region" value={datos.region} onChange={cambiar} isInvalid={Boolean(errores.region)}><option value="">Selecciona una región</option>{Object.keys(comunas).map((region) => <option key={region}>{region}</option>)}</Form.Select><MensajeCampo mensaje={errores.region} /></Form.Group>
                  <Form.Group className="mb-3" controlId="checkoutComuna"><Form.Label>Comuna</Form.Label><Form.Select ref={(elemento) => { referencias.current.comuna = elemento; }} name="comuna" value={datos.comuna} onChange={cambiar} disabled={!datos.region} isInvalid={Boolean(errores.comuna)}><option value="">Selecciona una comuna</option>{(comunas[datos.region] || []).map((comuna) => <option key={comuna}>{comuna}</option>)}</Form.Select><MensajeCampo mensaje={errores.comuna} /></Form.Group>
                  <Form.Group className="mb-3" controlId="checkoutDireccion"><Form.Label>Dirección</Form.Label><Form.Control ref={(elemento) => { referencias.current.direccion = elemento; }} name="direccion" value={datos.direccion} onChange={cambiar} isInvalid={Boolean(errores.direccion)} autoComplete="street-address" /><MensajeCampo mensaje={errores.direccion} /></Form.Group>
                  <Form.Group className="mb-4" controlId="checkoutReferencia"><Form.Label>Referencia <span>(opcional)</span></Form.Label><Form.Control name="referencia" value={datos.referencia} onChange={cambiar} autoComplete="address-line2" /></Form.Group>
                </div>}
              </> : <Alert variant="ritual">Tu carrito contiene solo experiencias. La entrega será digital.</Alert>}
              <Button type="submit" variant="ritual">Confirmar pedido simulado</Button>
            </Form></Col>
            <Col lg={4}><aside className="resumen-carrito"><h2>Resumen del pedido</h2><ul>{lineas.map((linea) => <li key={`${linea.tipo}-${linea.id}`}><span>{linea.nombre} × {linea.cantidad}</span><strong>{formatearPrecio(linea.precio * linea.cantidad)}</strong></li>)}</ul><dl><div><dt>Subtotal</dt><dd>{formatearPrecio(subtotal)}</dd></div><div><dt>Despacho</dt><dd>{formatearPrecio(costoDespacho)}</dd></div><div className="total"><dt>Total</dt><dd>{formatearPrecio(subtotal + costoDespacho)}</dd></div></dl></aside></Col>
          </Row>
        )}
      </Container></section>
    </>
  );
}

export default FinalizarCompra;

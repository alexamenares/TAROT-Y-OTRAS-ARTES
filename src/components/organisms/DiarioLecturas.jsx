import { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import {
  eliminarEntrada,
  guardarEntrada,
  obtenerEntradas,
} from "../../services/bibliotecaService";
import { formatearFecha } from "../../utils/formato";

/** Se crea al abrir el diario o después de guardar, usando la fecha local. */
function crearFormulario() {
  const hoy = new Date();
  const fecha = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
  return { fecha, pregunta: "", carta: "", observaciones: "", accion: "" };
}

/**
 * Estado local = formulario y lista que se muestran en pantalla.
 * Servicio = reglas y almacenamiento. Solo actualizamos la lista si guardar
 * termina correctamente, de modo que nunca anunciamos un éxito ficticio.
 */
function DiarioLecturas() {
  const [datos, setDatos] = useState(crearFormulario);
  const [entradas, setEntradas] = useState(obtenerEntradas);
  const [mensaje, setMensaje] = useState(null);
  const [aEliminar, setAEliminar] = useState(null);
  const preguntaRef = useRef(null);

  function cambiar(evento) {
    const { name, value } = evento.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
    setMensaje(null);
  }

  function guardar(evento) {
    evento.preventDefault();
    try {
      setEntradas(guardarEntrada(datos));
      setDatos(crearFormulario());
      setMensaje({
        tipo: "ritual",
        texto: "Lectura guardada en tu diario de esta sesión.",
      });
    } catch (error) {
      setMensaje({ tipo: "danger", texto: error.message });
    }
  }

  function editar(entrada) {
    setDatos({ ...entrada });
    setMensaje(null);
    preguntaRef.current?.focus();
  }

  function confirmarEliminar() {
    try {
      setEntradas(eliminarEntrada(aEliminar.id));
      if (datos.id === aEliminar.id) setDatos(crearFormulario());
      setAEliminar(null);
      setMensaje({ tipo: "ritual", texto: "Entrada eliminada." });
    } catch (error) {
      setAEliminar(null);
      setMensaje({ tipo: "danger", texto: error.message });
    }
  }

  return (
    <section className="actividad-biblioteca" aria-labelledby="titulo-diario">
      <h2 id="titulo-diario">Tu diario de lecturas</h2>
      <p>Las anotaciones se guardan durante esta sesión del navegador.</p>
      <Form className="formulario-ritual" onSubmit={guardar}>
        <h3>{datos.id ? "Editar lectura" : "Nueva lectura"}</h3>
        <Form.Group controlId="diario-fecha" className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            name="fecha"
            type="date"
            value={datos.fecha}
            onChange={cambiar}
            required
          />
        </Form.Group>
        {/* El arreglo evita repetir estructura sin ocultar qué campos existen. */}
        {[
          { name: "pregunta", label: "Tu pregunta", max: 300 },
          { name: "carta", label: "Carta observada", max: 100 },
          {
            name: "observaciones",
            label: "Tus observaciones",
            max: 2000,
            multilinea: true,
          },
          {
            name: "accion",
            label: "Una acción posible (opcional)",
            max: 500,
            multilinea: true,
          },
        ].map((campo) => (
          <Form.Group
            key={campo.name}
            controlId={`diario-${campo.name}`}
            className="mb-3"
          >
            <Form.Label>{campo.label}</Form.Label>
            <Form.Control
              ref={campo.name === "pregunta" ? preguntaRef : undefined}
              name={campo.name}
              as={campo.multilinea ? "textarea" : "input"}
              rows={campo.multilinea ? 3 : undefined}
              value={datos[campo.name]}
              onChange={cambiar}
              maxLength={campo.max}
              required={campo.name !== "accion"}
            />
          </Form.Group>
        ))}
        {mensaje && (
          <Alert
            variant={mensaje.tipo}
            role={mensaje.tipo === "danger" ? "alert" : "status"}
          >
            {mensaje.texto}
          </Alert>
        )}
        <div className="grupo-acciones">
          <Button variant="ritual" type="submit">
            {datos.id ? "Guardar cambios" : "Guardar lectura"}
          </Button>
          {datos.id && (
            <Button
              variant="ritual-outline"
              onClick={() => {
                setDatos(crearFormulario());
                setMensaje(null);
              }}
            >
              Cancelar edición
            </Button>
          )}
        </div>
      </Form>
      <h3 className="mt-5">Lecturas guardadas ({entradas.length})</h3>
      {entradas.length === 0 && <p>Aún no has guardado una lectura.</p>}
      <div className="lista-reservas">
        {entradas.map((entrada) => (
          <article className="tarjeta-ritual entrada-diario" key={entrada.id}>
            <p className="tipo-contenido">{formatearFecha(entrada.fecha)}</p>
            <h4>{entrada.carta}</h4>
            <p>
              <strong>Pregunta:</strong> {entrada.pregunta}
            </p>
            <p className="texto-anotacion">{entrada.observaciones}</p>
            {entrada.accion && (
              <p className="texto-anotacion">
                <strong>Acción:</strong> {entrada.accion}
              </p>
            )}
            <div className="grupo-acciones">
              <Button variant="ritual-outline" onClick={() => editar(entrada)}>
                Editar lectura
              </Button>
              <Button
                variant="ritual-outline"
                onClick={() => setAEliminar(entrada)}
              >
                Eliminar lectura
              </Button>
            </div>
          </article>
        ))}
      </div>
      <Modal
        show={Boolean(aEliminar)}
        onHide={() => setAEliminar(null)}
        centered
        className="modal-ritual"
        aria-labelledby="titulo-eliminar-lectura"
      >
        <Modal.Header closeButton closeLabel="Cerrar">
          <Modal.Title id="titulo-eliminar-lectura">
            Eliminar lectura
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Deseas eliminar la lectura de {aEliminar?.carta}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ritual-outline" onClick={() => setAEliminar(null)}>
            Volver
          </Button>
          <Button variant="ritual" onClick={confirmarEliminar}>
            Confirmar eliminación
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default DiarioLecturas;

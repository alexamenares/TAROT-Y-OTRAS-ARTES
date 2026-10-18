/**
 * RUTA /agenda · Formulario de cuatro pasos: especialidad, profesional, fecha, hora.
 * Cambiar una elección anterior limpia las que dependen de ella.
 * reservaService concentra disponibilidad y guardado; el formulario muestra
 * ocupaciones, validaciones y confirmación. Los datos provienen de profesionales.js.
 */
import { useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeroPagina from "../components/molecules/HeroPagina";
import profesionales, { especialidades } from "../data/profesionales";
import {
  crearReserva,
  estaHorarioOcupado,
  obtenerReservas,
} from "../services/reservaService";
import { formatearFecha } from "../utils/formato";

function Agenda() {
  const [seleccion, setSeleccion] = useState({
    especialidad: "",
    profesionalId: "",
    fecha: "",
    horario: "",
  });
  const [errores, setErrores] = useState({});
  const [confirmada, setConfirmada] = useState(null);
  // La copia local actualiza los botones. El servicio revalida al confirmar.
  const [reservas, setReservas] = useState(() => obtenerReservas());
  const [errorReserva, setErrorReserva] = useState("");
  const disponibles = useMemo(
    () =>
      profesionales.filter(
        (profesional) =>
          !seleccion.especialidad ||
          profesional.especialidad === seleccion.especialidad,
      ),
    [seleccion.especialidad],
  );
  const profesional = profesionales.find(
    (elemento) => elemento.id === seleccion.profesionalId,
  );

  function elegirEspecialidad(evento) {
    setSeleccion({
      especialidad: evento.target.value,
      profesionalId: "",
      fecha: "",
      horario: "",
    });
    setErrores({});
    setConfirmada(null);
    setErrorReserva("");
  }

  function elegirProfesional(id) {
    const elegido = profesionales.find((persona) => persona.id === id);
    // Elegir desde la lista inicial también completa la especialidad.
    setSeleccion({
      especialidad: elegido.especialidad,
      profesionalId: id,
      fecha: "",
      horario: "",
    });
    setErrorReserva("");
    setErrores({});
  }

  function confirmar(evento) {
    evento.preventDefault();
    const siguientes = {
      especialidad: seleccion.especialidad
        ? ""
        : "Selecciona un tipo de atención.",
      profesionalId: seleccion.profesionalId
        ? ""
        : "Selecciona un profesional.",
      fecha: seleccion.fecha ? "" : "Selecciona una fecha.",
      horario: seleccion.horario ? "" : "Selecciona un horario.",
    };
    setErrores(siguientes);
    if (Object.values(siguientes).some(Boolean)) return;
    try {
      const reserva = crearReserva(seleccion);
      setReservas(obtenerReservas());
      setErrorReserva("");
      setConfirmada(reserva);
    } catch (error) {
      // Una colisión se explica en el formulario; no confirmamos un fallo.
      setReservas(obtenerReservas());
      setErrorReserva(error.message);
      setSeleccion((actual) => ({ ...actual, horario: "" }));
    }
  }

  return (
    <>
      <HeroPagina
        etiqueta="Agenda tu sesión"
        titulo="Encuentra un espacio para conversar"
        descripcion="Selecciona atención, profesional, fecha y horario. La reserva es temporal y no incluye cobro."
        imagen="/imagenes/hero-contacto.png"
      />
      <section className="seccion-contenido">
        <Container>
          {confirmada ? (
            <div className="confirmacion-reserva">
              <p className="tipo-contenido">Reserva temporal confirmada</p>
              <h2>{confirmada.profesional}</h2>
              <p>
                {formatearFecha(confirmada.fecha)} a las {confirmada.horario}.
              </p>
              <div className="grupo-acciones">
                <Button as={Link} to="/mis-reservas" variant="ritual">
                  Ver mis reservas
                </Button>
                <Button
                  variant="ritual-outline"
                  onClick={() => {
                    setConfirmada(null);
                    setSeleccion({
                      especialidad: "",
                      profesionalId: "",
                      fecha: "",
                      horario: "",
                    });
                  }}
                >
                  Agendar otra
                </Button>
              </div>
            </div>
          ) : (
            <Form noValidate onSubmit={confirmar}>
              <div className="paso-agenda">
                <p className="tipo-contenido">Paso 1</p>
                <h2>Tipo de atención</h2>
                <Form.Select
                  aria-label="Tipo de atención"
                  value={seleccion.especialidad}
                  onChange={elegirEspecialidad}
                  isInvalid={Boolean(errores.especialidad)}
                >
                  <option value="">Selecciona una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad}>{especialidad}</option>
                  ))}
                </Form.Select>
                {errores.especialidad && (
                  <p className="mensaje-campo">{errores.especialidad}</p>
                )}
              </div>
              <div className="paso-agenda">
                <p className="tipo-contenido">Paso 2</p>
                <h2>Profesional disponible</h2>
                <Row className="g-3">
                  {disponibles.map((elemento) => (
                    <Col md={6} lg={4} key={elemento.id}>
                      <Card
                        className={`tarjeta-ritual tarjeta-profesional h-100 ${seleccion.profesionalId === elemento.id ? "seleccionada" : ""}`}
                      >
                        <Card.Img src={elemento.imagen} alt="" />
                        <Card.Body>
                          <p className="tipo-contenido">
                            {elemento.especialidad}
                          </p>
                          <Card.Title as="h3">{elemento.nombre}</Card.Title>
                          <Card.Text>{elemento.descripcion}</Card.Text>
                          <Button
                            variant={
                              seleccion.profesionalId === elemento.id
                                ? "ritual"
                                : "ritual-outline"
                            }
                            onClick={() => elegirProfesional(elemento.id)}
                          >
                            {seleccion.profesionalId === elemento.id
                              ? "Seleccionado"
                              : "Elegir"}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
                {errores.profesionalId && (
                  <p className="mensaje-campo">{errores.profesionalId}</p>
                )}
              </div>
              {profesional && (
                <>
                  <div className="paso-agenda">
                    <p className="tipo-contenido">Paso 3</p>
                    <h2>Fecha</h2>
                    <div className="opciones-agenda">
                      {profesional.fechas.map((fecha) => (
                        <Button
                          key={fecha}
                          variant={
                            seleccion.fecha === fecha
                              ? "ritual"
                              : "ritual-outline"
                          }
                          onClick={() => {
                            setSeleccion((actual) => ({
                              ...actual,
                              fecha,
                              horario: "",
                            }));
                            setErrores((actuales) => ({
                              ...actuales,
                              fecha: "",
                            }));
                          }}
                        >
                          {formatearFecha(fecha)}
                        </Button>
                      ))}
                    </div>
                    {errores.fecha && (
                      <p className="mensaje-campo">{errores.fecha}</p>
                    )}
                  </div>
                  <div className="paso-agenda">
                    <p className="tipo-contenido">Paso 4</p>
                    <h2>Horario</h2>
                    <div className="opciones-agenda">
                      {profesional.horarios.map((horario) => (
                        <Button
                          key={horario}
                          variant={
                            seleccion.horario === horario
                              ? "ritual"
                              : "ritual-outline"
                          }
                          // Un horario ocupado se ve, pero no se puede elegir.
                          disabled={
                            !seleccion.fecha ||
                            estaHorarioOcupado(
                              { ...seleccion, horario },
                              reservas,
                            )
                          }
                          aria-pressed={seleccion.horario === horario}
                          onClick={() => {
                            setErrorReserva("");
                            setSeleccion((actual) => ({ ...actual, horario }));
                            setErrores((actuales) => ({
                              ...actuales,
                              horario: "",
                            }));
                          }}
                        >
                          {horario}
                          {estaHorarioOcupado(
                            { ...seleccion, horario },
                            reservas,
                          )
                            ? " · Ocupado"
                            : ""}
                        </Button>
                      ))}
                    </div>
                    {seleccion.fecha &&
                      profesional.horarios.every((horario) =>
                        estaHorarioOcupado({ ...seleccion, horario }, reservas),
                      ) && (
                        <p role="status">
                          No quedan horarios disponibles para esta fecha. Elige
                          otro día.
                        </p>
                      )}
                    {errores.horario && (
                      <p className="mensaje-campo">{errores.horario}</p>
                    )}
                  </div>
                </>
              )}
              {errorReserva && (
                <Alert variant="danger" role="alert">
                  {errorReserva}
                </Alert>
              )}
              <Alert variant="ritual">
                La agenda es una demostración: no se enviará correo ni se
                cobrará la sesión.
              </Alert>
              <Button type="submit" variant="ritual">
                Confirmar reserva temporal
              </Button>
            </Form>
          )}
        </Container>
      </section>
    </>
  );
}

export default Agenda;

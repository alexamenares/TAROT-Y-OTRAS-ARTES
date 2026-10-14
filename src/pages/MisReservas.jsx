import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { cancelarReserva, obtenerReservas } from "../services/reservaService";
import { formatearFecha } from "../utils/formato";

function MisReservas() {
  const [reservas, setReservas] = useState(() => obtenerReservas());
  const [reservaACancelar, setReservaACancelar] = useState(null);
  function confirmarCancelacion() {
    setReservas(cancelarReserva(reservaACancelar.id));
    setReservaACancelar(null);
  }
  return (
    <section className="seccion-contenido pagina-reservas"><Container><div className="encabezado-seccion"><div><p className="tipo-contenido">Tu espacio personal</p><h1>Mis reservas</h1><p>Revisa o cancela las sesiones guardadas durante esta sesión del navegador.</p></div><Button as={Link} to="/agenda" variant="ritual">Nueva reserva</Button></div>
      {reservas.length === 0 ? <div className="estado-vacio"><h2>No tienes reservas activas</h2><p>Agenda una atención para verla aquí.</p><Button as={Link} to="/agenda" variant="ritual">Ir a la agenda</Button></div> : <div className="lista-reservas">{reservas.map((reserva) => <article className="tarjeta-ritual reserva" key={reserva.id}><div><p className="tipo-contenido">{reserva.especialidad}</p><h2>{reserva.profesional}</h2><p>{formatearFecha(reserva.fecha)} · {reserva.horario}</p></div><Button variant="ritual-outline" onClick={() => setReservaACancelar(reserva)}>Cancelar reserva</Button></article>)}</div>}
      <Modal show={Boolean(reservaACancelar)} onHide={() => setReservaACancelar(null)} centered className="modal-ritual"><Modal.Header closeButton><Modal.Title>Cancelar reserva</Modal.Title></Modal.Header><Modal.Body>¿Deseas cancelar la sesión con {reservaACancelar?.profesional}?</Modal.Body><Modal.Footer><Button variant="ritual-outline" onClick={() => setReservaACancelar(null)}>Volver</Button><Button variant="ritual" onClick={confirmarCancelacion}>Confirmar cancelación</Button></Modal.Footer></Modal>
    </Container></section>
  );
}

export default MisReservas;

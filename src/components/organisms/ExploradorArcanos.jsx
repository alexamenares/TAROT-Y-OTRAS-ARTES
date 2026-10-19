import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import arcanos from "../../data/arcanos";

/** Reutilizado por las lecturas 1 y 2; el estado solo controla la carta visible. */
function ExploradorArcanos() {
  const [indice, setIndice] = useState(0);
  const carta = arcanos[indice];

  function sacarCarta() {
    // Selección lúdica en el navegador; no interpreta la pregunta del usuario.
    setIndice(Math.floor(Math.random() * arcanos.length));
  }

  return (
    <section
      className="tarjeta-ritual actividad-biblioteca"
      aria-labelledby="titulo-explorador"
    >
      <h2 id="titulo-explorador">Explora los 22 arcanos mayores</h2>
      <Form.Group controlId="arcano-elegido" className="mb-4">
        <Form.Label>Elige una carta</Form.Label>
        <Form.Select
          value={indice}
          onChange={(evento) => setIndice(Number(evento.target.value))}
        >
          {arcanos.map((arcano) => (
            <option key={arcano.numero} value={arcano.numero}>
              {arcano.numero} · {arcano.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Row className="g-4 align-items-center">
        <Col sm={4}>
          <img
            className="arcano-ampliado"
            src={carta.imagen}
            alt={`Carta de Tarot ${carta.nombre}`}
          />
        </Col>
        <Col sm={8}>
          <div aria-live="polite" aria-atomic="true">
            <p className="tipo-contenido">{carta.tema}</p>
            <h3>{carta.nombre}</h3>
            <p>{carta.pregunta}</p>
          </div>
          <div className="grupo-acciones">
            <Button
              variant="ritual-outline"
              onClick={() =>
                setIndice((indice + arcanos.length - 1) % arcanos.length)
              }
            >
              Carta anterior
            </Button>
            <Button
              variant="ritual-outline"
              onClick={() => setIndice((indice + 1) % arcanos.length)}
            >
              Carta siguiente
            </Button>
            <Button variant="ritual" onClick={sacarCarta}>
              Sacar una carta al azar
            </Button>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default ExploradorArcanos;

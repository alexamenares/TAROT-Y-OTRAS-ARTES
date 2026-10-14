import { useState } from "react";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";

const inicial = [
  { id: 1, tipo: "Experiencia", nombre: "Tres cartas", publicado: true },
  { id: 2, tipo: "Producto", nombre: "Mazo clásico de Tarot", publicado: true },
  { id: 3, tipo: "Artículo", nombre: "Rituales simples para preparar tus cartas", publicado: false },
];

function Administracion() {
  const [elementos, setElementos] = useState(inicial);
  function alternar(id) {
    setElementos((actuales) => actuales.map((elemento) => elemento.id === id ? { ...elemento, publicado: !elemento.publicado } : elemento));
  }
  return (
    <section className="seccion-contenido pagina-admin"><Container><p className="tipo-contenido">Administración simulada</p><h1>Panel interno del MVP</h1><p>Vista demostrativa sin roles reales, API ni JWT.</p>
      <Row className="g-3 metricas-admin"><Col md={4}><article><span>Experiencias</span><strong>3</strong></article></Col><Col md={4}><article><span>Productos</span><strong>11</strong></article></Col><Col md={4}><article><span>Publicados</span><strong>{elementos.filter((elemento) => elemento.publicado).length}</strong></article></Col></Row>
      <div className="tabla-admin"><Table responsive><thead><tr><th>Tipo</th><th>Contenido</th><th>Estado</th><th>Acción</th></tr></thead><tbody>{elementos.map((elemento) => <tr key={elemento.id}><td>{elemento.tipo}</td><td>{elemento.nombre}</td><td><Badge bg={elemento.publicado ? "success" : "secondary"}>{elemento.publicado ? "Publicado" : "Borrador"}</Badge></td><td><Button size="sm" variant="ritual-outline" onClick={() => alternar(elemento.id)}>{elemento.publicado ? "Pasar a borrador" : "Publicar"}</Button></td></tr>)}</tbody></Table></div>
    </Container></section>
  );
}

export default Administracion;

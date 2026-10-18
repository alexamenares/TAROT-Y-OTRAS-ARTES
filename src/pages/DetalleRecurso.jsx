import { Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import recursos from "../data/biblioteca";
import ExploradorArcanos from "../components/organisms/ExploradorArcanos";
import DiarioLecturas from "../components/organisms/DiarioLecturas";
import NoEncontrada from "./NoEncontrada";

/**
 * Una sola pantalla presenta los seis recursos. useParams lee el id de la URL;
 * el campo actividad elige el componente interactivo sin duplicar páginas.
 */
function DetalleRecurso() {
  const { id } = useParams();
  const recurso = recursos.find((elemento) => String(elemento.id) === id);
  if (!recurso) return <NoEncontrada />;
  const siguiente = recursos[(recursos.indexOf(recurso) + 1) % recursos.length];

  return (
    <section className="seccion-contenido">
      <Container className="lectura-biblioteca">
        <Link className="enlace-volver" to="/biblioteca">
          ← Volver a la biblioteca
        </Link>
        <article>
          <header className="cabecera-lectura">
            <img src={recurso.imagen} alt={recurso.alt} />
            <div>
              <p className="tipo-contenido">{recurso.categoria}</p>
              <h1>{recurso.titulo}</h1>
              <p className="texto-destacado">{recurso.descripcion}</p>
            </div>
          </header>
          {recurso.secciones.map((seccion) => (
            <section className="seccion-lectura" key={seccion.titulo}>
              <h2>{seccion.titulo}</h2>
              <p>{seccion.texto}</p>
            </section>
          ))}
          {recurso.fuentes && (
            <aside className="seccion-lectura">
              <h2>Para seguir investigando</h2>
              <ul>
                {recurso.fuentes.map((fuente) => (
                  <li key={fuente.url}>
                    <a href={fuente.url} target="_blank" rel="noreferrer">
                      {fuente.titulo} (abre otra pestaña)
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </article>
        {/* key reinicia la selección de carta si cambiamos de recurso por URL. */}
        {["arcanos", "practica"].includes(recurso.actividad) && (
          <ExploradorArcanos key={id} />
        )}
        {recurso.actividad === "diario" && <DiarioLecturas />}
        <nav
          className="grupo-acciones mt-5"
          aria-label="Continuar en la biblioteca"
        >
          {recurso.actividad !== "diario" && (
            <Button as={Link} to="/biblioteca/4" variant="ritual">
              Escribir en mi diario
            </Button>
          )}
          <Button
            as={Link}
            to={`/biblioteca/${siguiente.id}`}
            variant="ritual-outline"
          >
            Siguiente: {siguiente.titulo}
          </Button>
        </nav>
      </Container>
    </section>
  );
}

export default DetalleRecurso;

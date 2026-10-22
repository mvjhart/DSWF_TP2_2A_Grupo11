import { Link } from "react-router";
import equipo from "../../assets/data/equipo.json";
import integrantes from "../../assets/data/integrantes.json";
import EquipoSelector from "./EquipoSelector";
import "./Inicio.css";

// "Grupo 11" -> "11": el número del equipo se usa como elemento gráfico.
const numeroDelEquipo = equipo.nombre.match(/\d+/)?.[0];

function Inicio() {
  return (
    <main className="inicio">
      <header className="inicio__hero">
        {numeroDelEquipo && (
          <span className="inicio__numero" aria-hidden="true">
            {numeroDelEquipo}
          </span>
        )}
        <h1 className="inicio__titulo">{equipo.nombre}</h1>
        <p className="inicio__comision">{equipo.comision}</p>
        <p className="inicio__descripcion">{equipo.descripcion}</p>
        <a className="inicio__cta" href="#equipo">
          Conocer al equipo
        </a>
      </header>

      <section className="inicio__secciones" aria-labelledby="inicio-secciones">
        <h2 id="inicio-secciones">Qué vas a encontrar</h2>
        <ul className="inicio__indice">
          {equipo.secciones.map(({ to, titulo, descripcion }) => (
            <li key={to}>
              <Link className="inicio__fila" to={to}>
                <span className="inicio__fila-titulo">{titulo}</span>
                <span className="inicio__fila-texto">{descripcion}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="equipo"
        className="inicio__equipo"
        aria-labelledby="inicio-equipo"
      >
        <h2 id="inicio-equipo">Conocé al equipo</h2>
        <p className="inicio__lead">
          Elegí a una persona para leer su presentación y entrar a su perfil.
        </p>
        <EquipoSelector integrantes={integrantes} />
      </section>
    </main>
  );
}

export default Inicio;

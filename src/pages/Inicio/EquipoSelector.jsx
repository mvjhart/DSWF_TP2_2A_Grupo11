import { useId, useRef, useState } from "react";
import { Link } from "react-router";
import MemberAvatar from "../../components/MemberAvatar/MemberAvatar";
import "./EquipoSelector.css";

// Colores de la paleta de etiquetas (index.css) que se reparten entre las
// personas, en el orden en que aparecen en integrantes.json.
const TONOS = ["violeta", "verde", "ambar", "celeste"];

const MENSAJE_SIN_PRESENTACION =
  "Su presentación todavía no está lista. Mientras tanto, podés ver su perfil.";

// Los datos que todavía no se cargaron en el JSON empiezan con "PENDIENTE".
function esPendiente(valor) {
  return (
    typeof valor !== "string" ||
    valor.trim() === "" ||
    valor.startsWith("PENDIENTE")
  );
}

// El slug es el nombre de pila en minúsculas (victoria, candelaria, ...).
function nombreCorto(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function agruparHabilidades(habilidades = []) {
  return habilidades
    .map(({ categoria, items }) => ({
      categoria,
      items: items.filter((item) => !esPendiente(item)),
    }))
    .filter(
      ({ categoria, items }) => !esPendiente(categoria) && items.length > 0,
    );
}

function EquipoSelector({ integrantes }) {
  const [slugActivo, setSlugActivo] = useState(integrantes[0]?.slug);
  const [animar, setAnimar] = useState(false);
  const tabsRef = useRef({});
  const idBase = useId();

  const indiceActivo = Math.max(
    integrantes.findIndex((integrante) => integrante.slug === slugActivo),
    0,
  );
  const activo = integrantes[indiceActivo];

  if (!activo) return null;

  const idPanel = `${idBase}-panel`;
  const idTab = (slug) => `${idBase}-tab-${slug}`;
  const tonoActivo = TONOS[indiceActivo % TONOS.length];
  const habilidades = agruparHabilidades(activo.habilidades);
  const tieneDetalle = !esPendiente(activo.rol) || habilidades.length > 0;

  function seleccionar(slug) {
    setAnimar(true);
    setSlugActivo(slug);
  }

  // Navegación con teclado entre las pestañas (patrón de tabs de WAI-ARIA).
  function manejarTeclas(evento) {
    const total = integrantes.length;
    let destino;

    switch (evento.key) {
      case "ArrowDown":
      case "ArrowRight":
        destino = (indiceActivo + 1) % total;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        destino = (indiceActivo - 1 + total) % total;
        break;
      case "Home":
        destino = 0;
        break;
      case "End":
        destino = total - 1;
        break;
      default:
        return;
    }

    evento.preventDefault();
    const { slug } = integrantes[destino];
    seleccionar(slug);
    tabsRef.current[slug]?.focus();
  }

  return (
    <div className="equipo">
      <div
        className="equipo__lista"
        role="tablist"
        aria-label="Integrantes del equipo"
        onKeyDown={manejarTeclas}
      >
        {integrantes.map((integrante, indice) => {
          const esActivo = integrante.slug === activo.slug;

          return (
            <button
              key={integrante.slug}
              ref={(elemento) => {
                tabsRef.current[integrante.slug] = elemento;
              }}
              type="button"
              role="tab"
              id={idTab(integrante.slug)}
              className="equipo__tab"
              aria-selected={esActivo}
              aria-controls={idPanel}
              tabIndex={esActivo ? 0 : -1}
              onClick={() => seleccionar(integrante.slug)}
            >
              <MemberAvatar
                nombre={integrante.nombre}
                imagen={integrante.imagen}
                alt={integrante.alt}
                tono={TONOS[indice % TONOS.length]}
              />
              <span>{nombreCorto(integrante.slug)}</span>
            </button>
          );
        })}
      </div>

      <div
        key={activo.slug}
        className={`equipo__panel${animar ? " equipo__panel--animado" : ""}`}
        role="tabpanel"
        id={idPanel}
        aria-labelledby={idTab(activo.slug)}
        data-tono={tonoActivo}
      >
        <MemberAvatar
          nombre={activo.nombre}
          imagen={activo.imagen}
          alt={activo.alt}
          tono={tonoActivo}
          tamano="l"
        />

        <div className="equipo__datos">
          <h3 className="equipo__nombre">{activo.nombre}</h3>

          {!esPendiente(activo.ciudad) && (
            <p className="equipo__ciudad">{activo.ciudad}</p>
          )}

          {!esPendiente(activo.tag) && (
            <p className="equipo__tag">{activo.tag}</p>
          )}

          <p className="equipo__descripcion">
            {esPendiente(activo.descripcion)
              ? MENSAJE_SIN_PRESENTACION
              : activo.descripcion}
          </p>

          {tieneDetalle && (
            <dl className="equipo__detalle">
              {!esPendiente(activo.rol) && (
                <div>
                  <dt>Responsabilidad</dt>
                  <dd>{activo.rol}</dd>
                </div>
              )}

              {habilidades.map(({ categoria, items }) => (
                <div key={categoria}>
                  <dt>{categoria}</dt>
                  <dd>
                    <ul className="equipo__chips">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <Link className="equipo__enlace" to={`/integrantes/${activo.slug}`}>
            Ver el perfil de {nombreCorto(activo.slug)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EquipoSelector;

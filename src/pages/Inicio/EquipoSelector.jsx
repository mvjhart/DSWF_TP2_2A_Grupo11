import { useId, useRef, useState } from "react";
import { Link } from "react-router";
import MemberAvatar from "../../components/MemberAvatar/MemberAvatar";
import { esPendiente } from "../../utils/esPendiente";
import "./EquipoSelector.css";

// El slug es el nombre de pila en minúsculas (victoria, candelaria, ...).
function nombreCorto(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
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
  const tonoActivo = activo.tono ?? "neutro";

  function seleccionar(slug) {
    setAnimar(true);
    setSlugActivo(slug);
  }

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
        {integrantes.map((integrante) => {
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
                tono={integrante.tono ?? "neutro"}
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
          tono={tonoActivo}
          tamano="l"
        />

        <div className="equipo__datos">
          <h3 className="equipo__nombre">{activo.nombre}</h3>

          {!esPendiente(activo.tag) && (
            <p className="equipo__tag">{activo.tag}</p>
          )}

          {/* ACÁ CAMBIAMOS LA DESCRIPCIÓN POR EL ROL */}
          <p className="equipo__rol">
            {esPendiente(activo.rol)
              ? "Responsabilidad en construcción."
              : activo.rol}
          </p>

          <Link className="equipo__enlace" to={`/integrantes/${activo.slug}`}>
            Ver el perfil de {nombreCorto(activo.slug)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EquipoSelector;
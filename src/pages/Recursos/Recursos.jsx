import { useState } from "react";
import favoritos from "../../assets/data/favoritos.json";
import integrantes from "../../assets/data/integrantes.json";
import AccordionItem from "../../components/AccordionItem/AccordionItem";
import "./Recursos.css";

const MARCA_PENDIENTE = "PENDIENTE";

const etiquetasTipo = {
  album: "Álbum",
  pelicula: "Película",
};

const nombrePorSlug = Object.fromEntries(
  integrantes.map((integrante) => [integrante.slug, integrante.nombre]),
);

// Un texto se puede mostrar si existe, no está vacío y no es un marcador
// "PENDIENTE: ..." del dataset.
function tieneTexto(valor) {
  return (
    typeof valor === "string" &&
    valor.trim() !== "" &&
    !valor.trim().startsWith(MARCA_PENDIENTE)
  );
}

// Un registro es completo si tiene título real y, siendo álbum, artista real.
function esRegistroCompleto(favorito) {
  if (!tieneTexto(favorito.titulo)) return false;
  if (favorito.tipo === "album" && !tieneTexto(favorito.artista)) return false;
  return true;
}

// Los datos son estáticos: se filtra una sola vez al cargar el módulo.
const favoritosVisibles = favoritos.filter(esRegistroCompleto);

const TODOS = "todos";

// Opciones de los filtros: salen de los registros visibles, sin repetidos,
// para que ninguna opción devuelva cero resultados por sí sola.
const tiposDisponibles = [
  ...new Set(favoritosVisibles.map((favorito) => favorito.tipo)),
].sort((a, b) =>
  (etiquetasTipo[a] ?? a).localeCompare(etiquetasTipo[b] ?? b, "es"),
);

const integrantesDisponibles = [
  ...new Set(favoritosVisibles.map((favorito) => favorito.memberSlug)),
]
  .map((slug) => ({ slug, nombre: nombrePorSlug[slug] ?? slug }))
  .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

const CAMPOS_BUSQUEDA = ["titulo", "artista", "comentario", "sinopsis"];

// Minúsculas y sin tildes, para que "totalitar" encuentre "Totalitär".
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Solo busca en textos reales: los marcadores PENDIENTE no cuentan.
function coincideConBusqueda(favorito, consulta) {
  if (consulta === "") return true;
  return CAMPOS_BUSQUEDA.some(
    (campo) =>
      tieneTexto(favorito[campo]) &&
      normalizar(favorito[campo]).includes(consulta),
  );
}

function Recursos() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(TODOS);
  const [integranteSeleccionado, setIntegranteSeleccionado] = useState(TODOS);
  const [busqueda, setBusqueda] = useState("");

  const consulta = normalizar(busqueda.trim());

  const favoritosFiltrados = favoritosVisibles.filter(
    (favorito) =>
      (tipoSeleccionado === TODOS || favorito.tipo === tipoSeleccionado) &&
      (integranteSeleccionado === TODOS ||
        favorito.memberSlug === integranteSeleccionado) &&
      coincideConBusqueda(favorito, consulta),
  );

  const hayFiltros =
    busqueda !== "" ||
    tipoSeleccionado !== TODOS ||
    integranteSeleccionado !== TODOS;

  function restablecerFiltros() {
    setBusqueda("");
    setTipoSeleccionado(TODOS);
    setIntegranteSeleccionado(TODOS);
  }

  return (
    <main className="recursos" aria-labelledby="recursos-titulo">
      <h1 id="recursos-titulo">Favoritos</h1>
      <p className="recursos__intro">
        Colección de películas y álbumes favoritos del equipo.
      </p>

      <section
        className="recursos__filtros"
        aria-label="Búsqueda y filtros de favoritos"
      >
        <label className="recursos__filtro recursos__busqueda">
          <span className="recursos__filtro-label">Buscar</span>
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Título, artista o comentario"
          />
        </label>
        <label className="recursos__filtro">
          <span className="recursos__filtro-label">Tipo</span>
          <select
            value={tipoSeleccionado}
            onChange={(evento) => setTipoSeleccionado(evento.target.value)}
          >
            <option value={TODOS}>Todos</option>
            {tiposDisponibles.map((tipo) => (
              <option key={tipo} value={tipo}>
                {etiquetasTipo[tipo] ?? tipo}
              </option>
            ))}
          </select>
        </label>

        <label className="recursos__filtro">
          <span className="recursos__filtro-label">Integrante</span>
          <select
            value={integranteSeleccionado}
            onChange={(evento) =>
              setIntegranteSeleccionado(evento.target.value)
            }
          >
            <option value={TODOS}>Todos</option>
            {integrantesDisponibles.map(({ slug, nombre }) => (
              <option key={slug} value={slug}>
                {nombre}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="recursos__restablecer"
          onClick={restablecerFiltros}
          disabled={!hayFiltros}
        >
          Restablecer
        </button>

        <p className="recursos__contador" aria-live="polite">
          {`${favoritosFiltrados.length} de ${favoritosVisibles.length} favoritos`}
        </p>
      </section>

      {favoritosFiltrados.length === 0 && (
        <section className="recursos__vacia" role="status">
          <p>
            No hay favoritos que coincidan con la búsqueda y los filtros
            seleccionados.
          </p>
          <button type="button" onClick={restablecerFiltros}>
            Ver todos los favoritos
          </button>
        </section>
      )}
      <div className="recursos__lista">
        {favoritosFiltrados.map((favorito) => {
          const generos = (favorito.generos ?? []).filter(tieneTexto);
          const duenio = nombrePorSlug[favorito.memberSlug];

          return (
            <AccordionItem
              key={favorito.id}
              title={favorito.titulo}
              headerContent={
                <>
                  {tieneTexto(favorito.artista) && (
                    <span className="recursos__artista">
                      {favorito.artista}
                    </span>
                  )}
                  {Number.isInteger(favorito.anio) && (
                    <span className="recursos__anio">{favorito.anio}</span>
                  )}
                  <span
                    className={`recursos__tipo recursos__tipo--${favorito.tipo}`}
                  >
                    {etiquetasTipo[favorito.tipo] ?? favorito.tipo}
                  </span>
                </>
              }
            >
              <div className="recursos__detalle">
                {tieneTexto(favorito.comentario) && (
                  <p className="recursos__comentario">{favorito.comentario}</p>
                )}
                {tieneTexto(favorito.sinopsis) && (
                  <p className="recursos__sinopsis">
                    <strong>Sinopsis:</strong> {favorito.sinopsis}
                  </p>
                )}
                {generos.length > 0 && (
                  <ul className="recursos__generos" aria-label="Géneros">
                    {generos.map((genero) => (
                      <li key={genero} className="recursos__genero">
                        {genero}
                      </li>
                    ))}
                  </ul>
                )}
                {duenio && (
                  <p className="recursos__duenio">
                    <strong>Favorito de:</strong> {duenio}
                  </p>
                )}
              </div>
            </AccordionItem>
          );
        })}
      </div>
    </main>
  );
}

export default Recursos;

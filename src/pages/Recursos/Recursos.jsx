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

function Recursos() {
  return (
    <main className="recursos" aria-labelledby="recursos-titulo">
      <h1 id="recursos-titulo">Favoritos</h1>
      <p className="recursos__intro">
        Colección de películas y álbumes favoritos del equipo.
      </p>

      {/* G.4 y G.5: acá se enchufan la búsqueda, el filtro, el contador y el
          estado sin resultados. */}

      <div className="recursos__lista">
        {favoritosVisibles.map((favorito) => {
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

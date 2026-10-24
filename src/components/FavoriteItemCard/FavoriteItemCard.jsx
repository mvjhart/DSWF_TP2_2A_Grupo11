import { esPendiente } from "../../utils/esPendiente";
import "./FavoriteItemCard.css";

const ETIQUETA_TIPO = {
  album: "Álbum",
  pelicula: "Película",
};

const IMAGENES_LOCALES = import.meta.glob(
  "/src/assets/images/**/*.{webp,jpg,jpeg,png,avif}",
  { eager: true, query: "?url", import: "default" },
);

function resolverPortada(portada) {
  if (esPendiente(portada)) return null;
  if (/^https?:\/\//.test(portada)) return portada;

  const rutaNormalizada = portada
    .replace(/^src\/assets\/images\//, "")
    .replace(/^\//, "");
  const url = IMAGENES_LOCALES[`/src/assets/images/${rutaNormalizada}`];

  return url ?? null;
}

function FavoriteItemCard({ favorito }) {
  const { tipo, titulo, artista, anio, generos, portada } = favorito;

  const urlPortada = resolverPortada(portada);
  const generosReales = (generos ?? []).filter((g) => !esPendiente(g));
  const mostrarArtista = tipo === "album" && !esPendiente(artista);
  const mostrarAnio = Number.isInteger(anio);

  const encabezado = <h3 className="fav-card__titulo">{titulo}</h3>;

  return (
    <article
      className={`fav-card fav-card--${tipo}${urlPortada ? " fav-card--con-imagen" : ""}`}
    >
      <div
        className="fav-card__portada"
        style={
          urlPortada
            ? {
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%), url("${urlPortada}")`,
              }
            : undefined
        }
      >
        <span className="fav-card__tipo">{ETIQUETA_TIPO[tipo] ?? tipo}</span>
        {mostrarAnio && <span className="fav-card__anio">{anio}</span>}
        {!urlPortada && encabezado}
      </div>

      <div className="fav-card__cuerpo">
        {urlPortada && encabezado}
        {mostrarArtista && <p className="fav-card__artista">{artista}</p>}
        {generosReales.length > 0 && (
          <p className="fav-card__generos">{generosReales.join(" · ")}</p>
        )}
      </div>
    </article>
  );
}

export default FavoriteItemCard;

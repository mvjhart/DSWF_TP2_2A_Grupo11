import { useId, useState } from 'react';
import {
  useAlbumesDeArtista,
  useTracksDeAlbum,
} from '../../hooks/useMusicBrainz';
import './Api.css';

const API_DOCS_URL = 'https://musicbrainz.org/doc/MusicBrainz_API';
const COVER_BASE = 'https://coverartarchive.org/release-group';

const ARTISTAS_SUGERIDOS = ['Slowdive', 'Radiohead', 'BTS', 'Bad Bunny'];
const ARTISTA_INICIAL = ARTISTAS_SUGERIDOS[0];

function formatearDuracion(ms) {
  const totalSeg = Math.round(ms / 1000);
  const min = Math.floor(totalSeg / 60);
  const seg = String(totalSeg % 60).padStart(2, '0');
  return `${min}:${seg}`;
}

function Estado({ children, error = false, compacto = false }) {
  const clases = ['api__estado'];
  if (error) clases.push('api__estado--error');
  if (compacto) clases.push('api__estado--compacto');

  return (
    <p className={clases.join(' ')} role={error ? 'alert' : 'status'}>
      {children}
    </p>
  );
}

function Portada({ album }) {
  const [fallo, setFallo] = useState(false);

  if (fallo) {
    return (
      <div className="api__portada api__portada--vacia">
        <span>Sin portada</span>
      </div>
    );
  }

  return (
    <img
      className="api__portada"
      src={`${COVER_BASE}/${album.id}/front-250`}
      alt={`Portada de ${album.titulo}`}
      loading="lazy"
      width="250"
      height="250"
      onError={() => setFallo(true)}
    />
  );
}

function AlbumCard({ album }) {
  const [expandido, setExpandido] = useState(false);
  const panelId = useId();
  const { tracks, cargando, error } = useTracksDeAlbum(album.id, expandido);

  return (
    <li className="api__album">
      <Portada album={album} />
      <h3>{album.titulo}</h3>
      <p>
        {album.artista}
        {album.fecha && ` · ${album.fecha.slice(0, 4)}`}
      </p>

      <button
        type="button"
        className="api__album-toggle"
        onClick={() => setExpandido((v) => !v)}
        aria-expanded={expandido}
        aria-controls={panelId}
      >
        {expandido ? 'Ocultar canciones' : 'Ver canciones'}
      </button>

      {expandido && (
        <div
          id={panelId}
          className="api__tracks"
          role="region"
          aria-label={`Canciones de ${album.titulo}`}
          tabIndex={0}
        >
          {cargando && <Estado compacto>Cargando canciones...</Estado>}
          {error && (
            <Estado error compacto>
              {error}
            </Estado>
          )}
          {!cargando && !error && tracks.length === 0 && (
            <Estado compacto>No hay información de canciones.</Estado>
          )}

          {tracks.length > 0 && (
            <ol className="api__tracks-lista">
              {tracks.map((track, i) => (
                <li key={`${track.disco}-${track.posicion}-${i}`}>
                  <span className="api__track-num">{track.posicion}.</span>
                  <span className="api__track-titulo">{track.titulo}</span>
                  {track.duracionMs ? (
                    <span className="api__track-dur">
                      {formatearDuracion(track.duracionMs)}
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </li>
  );
}

function Api() {
  const [artista, setArtista] = useState(ARTISTA_INICIAL);
  const [texto, setTexto] = useState(ARTISTA_INICIAL);
  const { albumes, cargando, error } = useAlbumesDeArtista(artista);

  function buscar(nombre) {
    const limpio = nombre.trim();
    if (!limpio) return;
    setTexto(limpio);
    setArtista(limpio);
  }

  function enviar(evento) {
    evento.preventDefault();
    buscar(texto);
  }

  return (
    <main className="api">
      <header className="api__encabezado">
        <h1>API pública: MusicBrainz</h1>
        <p>
          La música es lo que más se repite en los perfiles del equipo, así que
          elegimos MusicBrainz, una base de datos musical abierta y mantenida
          por una comunidad.
        </p>
      </header>

      <section className="api__explicacion" aria-labelledby="api-info">
        <h2 id="api-info">Qué es y qué información aporta</h2>
        <p>
          MusicBrainz expone un servicio web que se consulta directo desde el
          navegador y no requiere claves. Devuelve datos de artistas, álbumes,
          lanzamientos y canciones. Además usamos Cover Art Archive, el
          proyecto hermano que aloja las portadas.
        </p>

        <h3>Qué datos mostramos</h3>
        <p>
          Consultamos los álbumes de estudio de un artista y mostramos la
          portada, el título, el artista y el año. Al hacer click en un álbum
          se puede consultar su lista de canciones.
        </p>

        <h3>Cómo cuidamos el servicio</h3>
        <p>
          MusicBrainz permite una consulta por segundo. Por eso la aplicación
          espacia sus pedidos y guarda cada respuesta en caché durante la
          sesión: repetir una búsqueda o reabrir un álbum no vuelve a llamar a
          la API.
        </p>

        <p>
          <a href={API_DOCS_URL} target="_blank" rel="noopener noreferrer">
            Documentación oficial de la API de MusicBrainz
          </a>
        </p>
      </section>

      <section className="api__resultados" aria-labelledby="api-resultados">
        <h2 id="api-resultados">Álbumes de {artista}</h2>

        <form className="api__buscador" onSubmit={enviar}>
          <label htmlFor="api-artista">Artista</label>
          <input
            id="api-artista"
            type="search"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Nombre del artista"
          />
          <button type="submit" disabled={cargando}>
            Buscar
          </button>
        </form>

        <ul className="api__sugeridos" aria-label="Artistas sugeridos">
          {ARTISTAS_SUGERIDOS.map((nombre) => (
            <li key={nombre}>
              <button
                type="button"
                onClick={() => buscar(nombre)}
                aria-pressed={nombre === artista}
              >
                {nombre}
              </button>
            </li>
          ))}
        </ul>

        {cargando && <Estado>Consultando MusicBrainz...</Estado>}
        {error && <Estado error>{error}</Estado>}
        {!cargando && !error && albumes.length === 0 && (
          <Estado>
            No encontramos álbumes de estudio para &quot;{artista}&quot;. Probá
            con otro nombre.
          </Estado>
        )}

        {albumes.length > 0 && (
          <ul className="api__grilla">
            {albumes.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </ul>
        )}
      </section>

      <p className="api__creditos">
        Datos de MusicBrainz (dominio público) y portadas de Cover Art Archive.
      </p>
    </main>
  );
}

export default Api;
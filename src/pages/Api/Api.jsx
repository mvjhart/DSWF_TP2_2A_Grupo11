import { useId, useState } from "react";
import {
  useAlbumesDeArtista,
  useTracksDeAlbum,
} from "../../hooks/useMusicBrainz";
import { StatusMessage } from "../../components/ControlesFil/ControlesFil";
import { InfoTabs } from '../../components/InfoTabs/InfoTabs';
import { PageHeader } from "../../components/PageHeader/PageHeader.jsx";
import contenidoApi from '../../assets/data/api.json';
import "./Api.css";

const COVER_BASE = "https://coverartarchive.org/release-group";

const ARTISTAS_SUGERIDOS = ["Slowdive", "Radiohead", "BTS", "Bad Bunny"];
const ARTISTA_INICIAL = ARTISTAS_SUGERIDOS[0];

function formatearDuracion(ms) {
  const totalSeg = Math.round(ms / 1000);
  const min = Math.floor(totalSeg / 60);
  const seg = String(totalSeg % 60).padStart(2, "0");
  return `${min}:${seg}`;
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
  const { tracks, cargando, error, recargar } = useTracksDeAlbum(
    album.id,
    expandido,
  );

  const urlYouTube = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${album.artista} ${album.titulo}`,
  )}`;

  return (
    <li className="api__album">
      <Portada album={album} />
      <h3>{album.titulo}</h3>
      <p>
        {album.artista}
        {album.fecha && ` · ${album.fecha.slice(0, 4)}`}
      </p>

      <div className="api__album-links">
        <a href={urlYouTube} target="_blank" rel="noopener noreferrer">
          Escuchar en YouTube
        </a>
      </div>

      <button
        type="button"
        className="api__album-toggle"
        onClick={() => setExpandido((v) => !v)}
        aria-expanded={expandido}
        aria-controls={panelId}
      >
        {expandido ? "Ocultar canciones" : "Ver canciones"}
      </button>

      {expandido && (
        <div
          id={panelId}
          className="api__tracks"
          role="region"
          aria-label={`Canciones de ${album.titulo}`}
          tabIndex={0}
        >
          {cargando && (
            <StatusMessage compacto>Cargando canciones...</StatusMessage>
          )}
          {error && (
            <StatusMessage
              error
              compacto
              accion={{ etiqueta: "Reintentar", onClick: recargar }}
            >
              {error}
            </StatusMessage>
          )}
          {!cargando && !error && tracks.length === 0 && (
            <StatusMessage compacto>
              No hay información de canciones.
            </StatusMessage>
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
  const { albumes, cargando, error, recargar } = useAlbumesDeArtista(artista);

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

      {/*Header de Api*/}
      <PageHeader
        title={contenidoApi.encabezado.titulo}
        description={contenidoApi.encabezado.descripcion}
      />
      
      {/* Detalles de Api*/}
      <InfoTabs secciones={contenidoApi.secciones} />

      <section className="api__resultados" aria-labelledby="api-resultados">
        <div className="api__resultados-encabezado">
          <h2 id="api-resultados">Álbumes de {artista}</h2>
          <button
            type="button"
            className="api__actualizar"
            onClick={recargar}
            disabled={cargando}
          >
            {cargando && albumes.length > 0 ? "Actualizando..." : "Actualizar"}
          </button>
        </div>

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

        {cargando && albumes.length === 0 && (
          <StatusMessage>Consultando MusicBrainz...</StatusMessage>
        )}
        {error && (
          <StatusMessage
            error
            accion={{ etiqueta: "Reintentar", onClick: recargar }}
          >
            {error}
          </StatusMessage>
        )}
        {!cargando && !error && albumes.length === 0 && (
          <StatusMessage>
            No encontramos álbumes de estudio para &quot;{artista}&quot;. Probá
            con otro nombre.
          </StatusMessage>
        )}

        {albumes.length > 0 && (
          <ul className="api__grilla" aria-busy={cargando}>
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

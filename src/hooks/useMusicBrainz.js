import { useEffect, useState } from 'react';

const MB = 'https://musicbrainz.org/ws/2';
const INTERVALO_MS = 1000;
const PREFIJO_CACHE = 'mb3:';
const VACIO = [];

// ============================================================
// Caché (memoria + sessionStorage) y throttle de 1 req/seg
// ============================================================

const cacheMemoria = new Map();
let ultimaConsulta = 0;

function leerCache(clave) {
  if (cacheMemoria.has(clave)) return cacheMemoria.get(clave);
  try {
    const guardado = sessionStorage.getItem(PREFIJO_CACHE + clave);
    if (guardado !== null) {
      const datos = JSON.parse(guardado);
      cacheMemoria.set(clave, datos);
      return datos;
    }
  } catch {
    // sessionStorage no disponible: se usa solo la memoria.
  }
  return undefined;
}

function guardarCache(clave, datos) {
  cacheMemoria.set(clave, datos);
  try {
    sessionStorage.setItem(PREFIJO_CACHE + clave, JSON.stringify(datos));
  } catch {
    // Sin espacio o sin acceso: no es crítico.
  }
}

// Devuelve el dato cacheado o lo produce y lo guarda.
async function cacheado(clave, producir) {
  const enCache = leerCache(clave);
  if (enCache !== undefined) return enCache;
  const datos = await producir();
  guardarCache(clave, datos);
  return datos;
}

// Solo ocupa el turno quien realmente va a consultar: una consulta
// cancelada mientras espera no consume el cupo de nadie.
async function esperarTurno(signal) {
  for (;;) {
    signal.throwIfAborted();
    const espera = ultimaConsulta + INTERVALO_MS - Date.now();
    if (espera <= 0) break;
    await new Promise((resolver) => setTimeout(resolver, espera));
  }
  ultimaConsulta = Date.now();
}

async function consultar(url, signal) {
  await esperarTurno(signal);

  let respuesta;
  try {
    respuesta = await fetch(url, { signal });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new Error('No se pudo conectar con MusicBrainz. Revisá tu conexión.');
  }

  if (!respuesta.ok) {
    throw new Error(`MusicBrainz respondió ${respuesta.status}.`);
  }
  return respuesta.json();
}

// ============================================================
// Consultas
// ============================================================

// Devuelve { id, nombre } del artista (nombre oficial) o null.
function buscarArtista(nombre, signal) {
  const buscado = nombre.trim().toLowerCase();

  return cacheado(`artist:${buscado}`, async () => {
    const consulta = `artist:"${buscado.replaceAll('"', '')}"`;
    const json = await consultar(
      `${MB}/artist?query=${encodeURIComponent(consulta)}&fmt=json&limit=5`,
      signal,
    );
    const artistas = json.artists ?? [];
    const elegido =
      artistas.find((a) => a.name.toLowerCase() === buscado) ?? artistas[0];

    return elegido ? { id: elegido.id, nombre: elegido.name } : null;
  });
}

async function buscarAlbumes(nombreArtista, signal) {
  const artista = await buscarArtista(nombreArtista, signal);
  if (!artista) return [];

  return cacheado(`albums:${artista.id}`, async () => {
    const json = await consultar(
      `${MB}/release-group?artist=${artista.id}&type=album&fmt=json&limit=100`,
      signal,
    );
    const vistos = new Set();

    return (json['release-groups'] ?? [])
      .filter((rg) => !rg['secondary-types']?.length)
      .map((rg) => ({
        id: rg.id,
        titulo: rg.title,
        artista: artista.nombre,
        fecha: rg['first-release-date'] ?? '',
      }))
      .sort((a, b) => (a.fecha || '9999').localeCompare(b.fecha || '9999'))
      .filter(({ titulo }) => {
        const clave = titulo.toLowerCase();
        if (vistos.has(clave)) return false;
        vistos.add(clave);
        return true;
      });
  });
}

function buscarTracks(rgId, signal) {
  return cacheado(`tracks:${rgId}`, async () => {
    const json = await consultar(
      `${MB}/release?release-group=${rgId}&status=official&inc=recordings&fmt=json&limit=1`,
      signal,
    );

    return (json.releases?.[0]?.media ?? []).flatMap((media, i) =>
      (media.tracks ?? []).map((track) => ({
        posicion: track.number,
        titulo: track.title,
        duracionMs: track.length ?? null,
        disco: media.position ?? i + 1,
      })),
    );
  });
}

// ============================================================
// Hooks
// ============================================================

// El resultado guarda el argumento con el que se pidió. Si no coincide
// con el actual, todavía se está esperando la respuesta nueva: así
// "cargando" se deduce y no hace falta setState síncrono en el efecto.
// `buscar` debe ser una función estable (de módulo).
function useConsulta(buscar, argumento, habilitado = true) {
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    if (!habilitado) return;

    const controlador = new AbortController();
    buscar(argumento, controlador.signal)
      .then((datos) => setResultado({ argumento, datos, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setResultado({ argumento, datos: null, error: err.message });
      });

    return () => controlador.abort();
  }, [buscar, argumento, habilitado]);

  const vigente = resultado?.argumento === argumento;
  return {
    datos: vigente ? resultado.datos : null,
    error: vigente ? resultado.error : null,
    cargando: habilitado && !vigente,
  };
}

export function useAlbumesDeArtista(nombreArtista) {
  const { datos, error, cargando } = useConsulta(buscarAlbumes, nombreArtista);
  return { albumes: datos ?? VACIO, cargando, error };
}

export function useTracksDeAlbum(rgId, habilitado) {
  const { datos, error, cargando } = useConsulta(
    buscarTracks,
    rgId,
    habilitado,
  );
  return { tracks: datos ?? VACIO, cargando, error };
}
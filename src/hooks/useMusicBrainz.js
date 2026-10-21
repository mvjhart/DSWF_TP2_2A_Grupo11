import { useCallback, useEffect, useRef, useState } from 'react';

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

// Devuelve el dato cacheado o lo produce y lo guarda. Con `forzar` ignora
// la caché y la reemplaza con la respuesta nueva. Un `null` (artista no
// encontrado) no se guarda, para que reintentar vuelva a consultar.
async function cacheado(clave, producir, forzar = false) {
  if (!forzar) {
    const enCache = leerCache(clave);
    if (enCache !== undefined) return enCache;
  }
  const datos = await producir();
  if (datos !== null) guardarCache(clave, datos);
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
    throw new Error(
      'No se pudo conectar con MusicBrainz. Revisá tu conexión.',
      { cause: err },
    );
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

async function buscarAlbumes(nombreArtista, signal, forzar) {
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
  }, forzar);
}

function buscarTracks(rgId, signal, forzar) {
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
  }, forzar);
}

// ============================================================
// Hooks
// ============================================================

// Cada resultado guarda el argumento y el número de refresco con que se
// pidió. Si no coinciden con los actuales, hay una consulta en curso: así
// "cargando" se deduce y no hace falta setState síncrono en el efecto.
// Mientras se refresca el mismo argumento se conservan los datos anteriores
// (para no vaciar la pantalla), pero el error se oculta hasta tener respuesta.
// `buscar` debe ser una función estable (de módulo).
function useConsulta(buscar, argumento, habilitado = true) {
  const [resultado, setResultado] = useState(null);
  const [refresco, setRefresco] = useState(0);
  const enCurso = useRef(false);
  const refrescoAplicado = useRef(0);

  useEffect(() => {
    if (!habilitado) return;

    // Solo las consultas que vienen de `recargar` ignoran la caché.
    const forzar = refresco !== refrescoAplicado.current;
    refrescoAplicado.current = refresco;

    const controlador = new AbortController();
    const { signal } = controlador;
    enCurso.current = true;

    buscar(argumento, signal, forzar)
      .then((datos) => {
        if (signal.aborted) return;
        enCurso.current = false;
        setResultado({ argumento, refresco, datos, error: null });
      })
      .catch((err) => {
        if (signal.aborted || err.name === 'AbortError') return;
        enCurso.current = false;
        setResultado({ argumento, refresco, datos: null, error: err.message });
      });

    return () => {
      controlador.abort();
      enCurso.current = false;
    };
  }, [buscar, argumento, habilitado, refresco]);

  // Vuelve a consultar (actualizar o reintentar). Se ignora si ya hay una
  // consulta en curso, para no encimar pedidos.
  const recargar = useCallback(() => {
    if (enCurso.current) return;
    setRefresco((n) => n + 1);
  }, []);

  const mismoArgumento = resultado?.argumento === argumento;
  const vigente = mismoArgumento && resultado.refresco === refresco;

  return {
    datos: mismoArgumento ? resultado.datos : null,
    error: vigente ? resultado.error : null,
    cargando: habilitado && !vigente,
    recargar,
  };
}

export function useAlbumesDeArtista(nombreArtista) {
  const { datos, error, cargando, recargar } = useConsulta(
    buscarAlbumes,
    nombreArtista,
  );
  return { albumes: datos ?? VACIO, cargando, error, recargar };
}

export function useTracksDeAlbum(rgId, habilitado) {
  const { datos, error, cargando, recargar } = useConsulta(
    buscarTracks,
    rgId,
    habilitado,
  );
  return { tracks: datos ?? VACIO, cargando, error, recargar };
}
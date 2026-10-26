import { useEffect, useRef, useState } from "react";
import "./GadgetCandelaria.css";

// En "puntos", la primera clave es la criatura principal de esa opción.
const PREGUNTAS = [
  {
    id: "plan",
    texto: "¿Cuál sería tu plan ideal para la noche de Halloween?",
    opciones: [
      {
        texto: "Cocinar algo raro y probar recetas nuevas",
        puntos: { bruja: 2, momia: 1 },
      },
      {
        texto: "Salir y volver cuando ya amanece",
        puntos: { vampiro: 2, gato: 1 },
      },
      {
        texto: "Maratón de películas de terror bajo una manta",
        puntos: { fantasma: 2, momia: 1 },
      },
      {
        texto: "Recorrer el barrio a oscuras, a mi ritmo",
        puntos: { gato: 2, vampiro: 1 },
      },
    ],
  },
  {
    id: "codigo",
    texto: "¿Cómo trabajás cuando tenés que programar?",
    opciones: [
      {
        texto: "Probando y corrigiendo hasta que funciona",
        puntos: { bruja: 2, gato: 1 },
      },
      {
        texto: "De noche, cuando ya no hay ruido",
        puntos: { vampiro: 2, fantasma: 1 },
      },
      {
        texto: "Sin que nadie mire hasta que está terminado",
        puntos: { fantasma: 2, gato: 1 },
      },
      {
        texto: "Con todo ordenado y documentado",
        puntos: { momia: 2, bruja: 1 },
      },
    ],
  },
  {
    id: "escritorio",
    texto: "¿Qué no puede faltar en tu escritorio?",
    opciones: [
      {
        texto: "Una taza de algo bien caliente",
        puntos: { bruja: 2, fantasma: 1 },
      },
      {
        texto: "Las cortinas cerradas y poca luz",
        puntos: { vampiro: 2, momia: 1 },
      },
      {
        texto: "Un rincón cómodo para la siesta",
        puntos: { gato: 2, momia: 1 },
      },
      {
        texto: "Libros y apuntes de todas las épocas",
        puntos: { momia: 2, fantasma: 1 },
      },
    ],
  },
  {
    id: "ruido",
    texto: "Son las tres de la mañana y se oye un ruido raro. ¿Qué hacés?",
    opciones: [
      {
        texto: "Me quedo mirando fijo hasta que se calle",
        puntos: { gato: 2, fantasma: 1 },
      },
      {
        texto: "Me tapo hasta la cabeza y espero",
        puntos: { fantasma: 2, momia: 1 },
      },
      {
        texto: "Me quedo inmóvil y analizo el sonido",
        puntos: { momia: 2, vampiro: 1 },
      },
      {
        texto: "Perfecto, una excusa para seguir despierto",
        puntos: { vampiro: 2, bruja: 1 },
      },
    ],
  },
];

const FRASES_PREGUNTA = [
  "Empecemos. Pensá bien antes de elegir.",
  "Interesante. Seguimos.",
  "Ya casi, no te distraigas.",
  "Última pregunta. Sin presión.",
];

const RESULTADOS = {
  bruja: {
    id: "bruja",
    titulo: "Bruja",
    texto:
      "Lo tuyo es probar, mezclar y corregir hasta que la receta, o el código, sale bien. Ninguna buena idea se te escapa.",
    frase: "Te queda muy bien el sombrero.",
  },
  vampiro: {
    id: "vampiro",
    titulo: "Vampiro",
    texto:
      "Rendís más cuando baja el sol y se hace silencio. Preferís la penumbra, las horas tranquilas y los planes que empiezan tarde.",
    frase: "Ese cuello alto es todo un estilo.",
  },
  fantasma: {
    id: "fantasma",
    titulo: "Fantasma",
    texto:
      "Trabajás mejor sin público y aparecés recién cuando todo está listo, con un resultado que sorprende a todos.",
    frase: "Ahora no se me ve nada, pero sigo acá.",
  },
  momia: {
    id: "momia",
    titulo: "Momia",
    texto:
      "Ordenada o ordenado, metódico y constante: guardás todo en su lugar y documentás lo importante para que dure siglos.",
    frase: "Bien envuelta, como corresponde.",
  },
  gato: {
    id: "gato",
    titulo: "Gato negro",
    texto:
      "Independiente, curioso y con mucho carácter. Hacés las cosas a tu ritmo y siempre sabés dónde está el rincón más cómodo.",
    frase: "Sos de los míos.",
  },
};

function calcularResultado(respuestas) {
  const puntajes = {};

  respuestas.forEach((indice, pregunta) => {
    const { puntos } = PREGUNTAS[pregunta].opciones[indice];
    Object.entries(puntos).forEach(([id, valor]) => {
      puntajes[id] = (puntajes[id] ?? 0) + valor;
    });
  });

  const maximo = Math.max(...Object.values(puntajes));
  const empatadas = Object.keys(puntajes).filter(
    (id) => puntajes[id] === maximo,
  );

  // En un empate gana la criatura principal de la última respuesta.
  const ultima = respuestas.length - 1;
  const { puntos } = PREGUNTAS[ultima].opciones[respuestas[ultima]];
  const preferida = Object.keys(puntos)[0];

  return empatadas.includes(preferida) ? preferida : empatadas[0];
}

function GatoNegro({ disfraz }) {
  return (
    <svg
      className="test__gato"
      viewBox="0 -12 64 76"
      aria-hidden="true"
      focusable="false"
    >
      <path className="test__gato-cola" d="M48 56 C60 56 62 40 54 34" />
      <path
        className="test__gato-cuerpo"
        d="M12 58 C10 40 18 30 30 30 C42 30 50 40 48 58 Z"
      />

      {disfraz === "vampiro" && (
        <>
          <path className="test__capa" d="M20 36 L7 19 L25 33 Z" />
          <path className="test__capa" d="M40 36 L53 19 L35 33 Z" />
        </>
      )}

      <circle className="test__gato-cuerpo" cx="30" cy="24" r="10" />
      <path className="test__gato-cuerpo" d="M21 18 L22 6 L29 14 Z" />
      <path className="test__gato-cuerpo" d="M39 18 L38 6 L31 14 Z" />

      {disfraz === "vampiro" && (
        <>
          <path className="test__colmillo" d="M26 29 L27.5 33 L29 29 Z" />
          <path className="test__colmillo" d="M31 29 L32.5 33 L34 29 Z" />
        </>
      )}

      {disfraz === "momia" && (
        <g className="test__venda">
          <line x1="21" y1="19" x2="39" y2="19" />
          <line x1="20.5" y1="29" x2="39.5" y2="29" />
          <line x1="19" y1="36" x2="41" y2="36" />
          <line x1="15" y1="42" x2="45" y2="42" />
          <line x1="13" y1="48" x2="47" y2="48" />
          <line x1="12" y1="54" x2="48" y2="54" />
        </g>
      )}

      {disfraz === "fantasma" && (
        <path
          className="test__sabana"
          d="M5 60 C3 34 13 15 30 15 C47 15 57 34 55 60 L49 55 L43 60 L37 55 L31 60 L25 55 L19 60 L13 55 Z"
        />
      )}

      {disfraz === "bruja" && (
        <>
          <ellipse
            className="test__sombrero"
            cx="30"
            cy="15"
            rx="15"
            ry="3.2"
          />
          <path className="test__sombrero" d="M19.5 15 L31 -9 L40.5 15 Z" />
          <path
            className="test__sombrero-cinta"
            d="M20.5 11.5 L39.5 11.5 L40.4 14.5 L19.6 14.5 Z"
          />
        </>
      )}

      <ellipse className="test__gato-ojo" cx="26" cy="24" rx="2" ry="3" />
      <ellipse className="test__gato-ojo" cx="34" cy="24" rx="2" ry="3" />
    </svg>
  );
}

export default function GadgetCandelaria() {
  const [respuestas, setRespuestas] = useState([]);
  const titulo = useRef(null);
  const moverFoco = useRef(false);

  const total = PREGUNTAS.length;
  const terminado = respuestas.length === total;
  const resultado = terminado
    ? RESULTADOS[calcularResultado(respuestas)]
    : null;
  const pregunta = PREGUNTAS[respuestas.length];

  // Después de cada cambio de paso, el foco pasa al título nuevo.
  useEffect(() => {
    if (!moverFoco.current) return;
    moverFoco.current = false;
    titulo.current?.focus();
  }, [respuestas.length]);

  function responder(indice) {
    moverFoco.current = true;
    setRespuestas([...respuestas, indice]);
  }

  function volver() {
    moverFoco.current = true;
    setRespuestas(respuestas.slice(0, -1));
  }

  function reiniciar() {
    moverFoco.current = true;
    setRespuestas([]);
  }

  const frase = resultado
    ? resultado.frase
    : FRASES_PREGUNTA[respuestas.length];

  return (
    <section
      className={`test${resultado?.id === "gato" ? " test--gato" : ""}`}
      aria-labelledby="test-titulo"
    >
      <h2 id="test-titulo" className="test__titulo">
        ¿Qué criatura de Halloween sos?
      </h2>

      <div className="test__escena">
        <GatoNegro disfraz={resultado?.id ?? null} />
        <p className="test__globo">{frase}</p>
      </div>

      <div className="test__panel" key={respuestas.length}>
        {terminado ? (
          <>
            <p className="test__progreso">Resultado</p>
            <h3 className="test__pregunta" tabIndex={-1} ref={titulo}>
              Tu criatura es: {resultado.titulo}
            </h3>
            <p className="test__descripcion">{resultado.texto}</p>
            <button type="button" className="test__boton" onClick={reiniciar}>
              Repetir el test
            </button>
          </>
        ) : (
          <>
            <p className="test__progreso">
              Pregunta {respuestas.length + 1} de {total}
            </p>
            <div
              className="test__barra"
              role="progressbar"
              aria-label="Progreso del test"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={respuestas.length}
            >
              <span
                className="test__barra-relleno"
                style={{ width: `${(respuestas.length / total) * 100}%` }}
              />
            </div>

            <h3 className="test__pregunta" tabIndex={-1} ref={titulo}>
              {pregunta.texto}
            </h3>

            <ul className="test__opciones">
              {pregunta.opciones.map((opcion, indice) => (
                <li key={opcion.texto}>
                  <button
                    type="button"
                    className="test__opcion"
                    onClick={() => responder(indice)}
                  >
                    {opcion.texto}
                  </button>
                </li>
              ))}
            </ul>

            {respuestas.length > 0 && (
              <button type="button" className="test__volver" onClick={volver}>
                Volver a la pregunta anterior
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}

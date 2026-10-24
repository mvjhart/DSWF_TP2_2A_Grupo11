import { useState } from "react";
import "./GadgetVictoria.css";

const PALETA_INICIAL = ["#4C1D95", "#7C3AED", "#A78BFA", "#F472B6", "#FDE68A"];

// h en grados (0-360), s y l entre 0 y 1.
function hslAHex(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const canal = (n) => {
    const k = (n + h / 30) % 12;
    const valor = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(valor * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${canal(0)}${canal(8)}${canal(4)}`.toUpperCase();
}

function colorAleatorio() {
  const tono = Math.floor(Math.random() * 360);
  const saturacion = 0.55 + Math.random() * 0.3;
  const luminosidad = 0.35 + Math.random() * 0.4;
  return hslAHex(tono, saturacion, luminosidad);
}

// Elige texto oscuro o blanco según la luminosidad relativa del fondo.
function textoSobre(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const luminancia = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminancia > 0.179 ? "#111111" : "#FFFFFF";
}

export default function GadgetVictoria() {
  const [paleta, setPaleta] = useState(
    PALETA_INICIAL.map((hex) => ({ hex, bloqueado: false })),
  );
  const [aviso, setAviso] = useState("");

  const bloqueados = paleta.filter((color) => color.bloqueado).length;

  function generar() {
    setPaleta(
      paleta.map((color) =>
        color.bloqueado ? color : { ...color, hex: colorAleatorio() },
      ),
    );
    setAviso(
      bloqueados === paleta.length
        ? "Todos los colores están bloqueados, no hay nada para cambiar."
        : "Paleta nueva generada.",
    );
  }

  function alternarBloqueo(indice) {
    setPaleta(
      paleta.map((color, i) =>
        i === indice ? { ...color, bloqueado: !color.bloqueado } : color,
      ),
    );
  }

  async function copiar(hex) {
    try {
      await navigator.clipboard.writeText(hex);
      setAviso(`Copiado ${hex}`);
    } catch {
      setAviso(`No se pudo copiar. El código es ${hex}`);
    }
  }

  return (
    <section className="paleta" aria-labelledby="paleta-titulo">
      <h2 id="paleta-titulo" className="paleta__titulo">
        Generador de paletas
      </h2>
      <p className="paleta__texto">
        Generá una paleta, bloqueá los colores que te gusten y volvé a generar.
        Tocá un código para copiarlo.
      </p>

      <ul className="paleta__colores">
        {paleta.map(({ hex, bloqueado }, indice) => {
          const colorTexto = textoSobre(hex);
          return (
            <li
              key={indice}
              className={`paleta__color${bloqueado ? " paleta__color--bloqueado" : ""}`}
              style={{ backgroundColor: hex, color: colorTexto }}
            >
              <button
                type="button"
                className="paleta__hex"
                onClick={() => copiar(hex)}
                aria-label={`Copiar el código ${hex}`}
              >
                {hex}
              </button>
              <button
                type="button"
                className="paleta__bloqueo"
                onClick={() => alternarBloqueo(indice)}
                aria-pressed={bloqueado}
              >
                {bloqueado ? "Bloqueado" : "Bloquear"}
                <span className="paleta__oculto"> color {indice + 1}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" className="paleta__boton" onClick={generar}>
        Nueva paleta
      </button>

      <p className="paleta__aviso" role="status">
        {aviso}
      </p>
    </section>
  );
}

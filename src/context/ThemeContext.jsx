// src/context/ThemeContext.jsx

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);

function obtenerTemaInicial() {
  const temaInicial = document.documentElement.dataset.theme;

  return temaInicial === "oscuro" ? "oscuro" : "claro";
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(obtenerTemaInicial);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;

    try {
      localStorage.setItem("theme", tema);
    } catch {
      // El tema sigue funcionando aunque no se pueda guardar.
    }
  }, [tema]);

  const alternarTema = useCallback(
    (boton) => {
      const raiz = document.documentElement;
      const temaDestino = tema === "claro" ? "oscuro" : "claro";

      const actualizar = () => {
        raiz.dataset.theme = temaDestino;

        flushSync(() => {
          setTema(temaDestino);
        });
      };

      const prefiereMenosMovimiento = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (
        prefiereMenosMovimiento ||
        typeof document.startViewTransition !== "function"
      ) {
        actualizar();
        return;
      }

      const rect = boton.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      const radio = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      raiz.style.setProperty("--tema-x", `${x}px`);
      raiz.style.setProperty("--tema-y", `${y}px`);
      raiz.style.setProperty("--tema-radio", `${radio}px`);

      raiz.dataset.themeTransicion =
        temaDestino === "oscuro" ? "a-oscuro" : "a-claro";

      const transicion = document.startViewTransition(actualizar);

      transicion.finished.then(
        () => {
          raiz.removeAttribute("data-theme-transicion");
          raiz.style.removeProperty("--tema-x");
          raiz.style.removeProperty("--tema-y");
          raiz.style.removeProperty("--tema-radio");
        },
        () => {
          raiz.removeAttribute("data-theme-transicion");
          raiz.style.removeProperty("--tema-x");
          raiz.style.removeProperty("--tema-y");
          raiz.style.removeProperty("--tema-radio");
        },
      );
    },
    [tema],
  );

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error("useTheme debe utilizarse dentro de ThemeProvider.");
  }

  return contexto;
}

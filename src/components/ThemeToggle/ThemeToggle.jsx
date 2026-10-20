// src/components/ThemeToggle/ThemeToggle.jsx

import { useTheme } from "../../hooks/useTheme.js";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { tema, alternarTema } = useTheme();
  const temaDestino = tema === "claro" ? "oscuro" : "claro";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={(event) => alternarTema(event.currentTarget)}
      aria-label={`Cambiar a tema ${temaDestino}`}
      title={`Cambiar a tema ${temaDestino}`}
    >
      <span aria-hidden="true">{tema === "claro" ? "🌙" : "☀️"}</span>
    </button>
  );
}

export default ThemeToggle;

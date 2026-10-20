import { useContext } from "react";
import ThemeContext from "../context/ThemeContext.js";

export function useTheme() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error("useTheme debe utilizarse dentro de ThemeProvider.");
  }

  return contexto;
}

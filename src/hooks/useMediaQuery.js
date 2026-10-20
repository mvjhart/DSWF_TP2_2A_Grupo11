import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    function actualizarEstado(event) {
      setMatches(event.matches);
    }

    // Sincroniza el estado con la consulta actual.
    setMatches(mediaQuery.matches);

    // Escucha cambios en la coincidencia de la media query.
    mediaQuery.addEventListener("change", actualizarEstado);

    return () => {
      mediaQuery.removeEventListener("change", actualizarEstado);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;

// src/hooks/useMediaQuery.js

import { useSyncExternalStore } from "react";

function useMediaQuery(query) {
  function suscribirse(callback) {
    const mediaQuery = window.matchMedia(query);

    mediaQuery.addEventListener("change", callback);

    return () => {
      mediaQuery.removeEventListener("change", callback);
    };
  }

  function obtenerSnapshot() {
    return window.matchMedia(query).matches;
  }

  return useSyncExternalStore(suscribirse, obtenerSnapshot, () => false);
}

export default useMediaQuery;

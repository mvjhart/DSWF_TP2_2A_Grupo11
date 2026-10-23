import { useEffect, useState } from "react";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [esVisible, setEsVisible] = useState(false);

  useEffect(() => {
    const alternarVisibilidad = () => {
      // Buscamos si el scroll está en la ventana o en el contenedor de la app
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const contenedor = document.querySelector(".app-content");
      const scrollContenedor = contenedor ? contenedor.scrollTop : 0;

      // Si cualquiera de los dos pasa los 100px, mostramos el botón
      if (scrollY > 100 || scrollContenedor > 100) {
        setEsVisible(true);
      } else {
        setEsVisible(false);
      }
    };

    // Escuchamos el scroll en la ventana Y en el contenedor
    window.addEventListener("scroll", alternarVisibilidad);
    const contenedor = document.querySelector(".app-content");
    if (contenedor) contenedor.addEventListener("scroll", alternarVisibilidad);

    return () => {
      window.removeEventListener("scroll", alternarVisibilidad);
      if (contenedor)
        contenedor.removeEventListener("scroll", alternarVisibilidad);
    };
  }, []);

  const irArriba = () => {
    // Subimos la ventana
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });

    // Subimos el contenedor interno (por si el scroll está ahí)
    const contenedor = document.querySelector(".app-content");
    if (contenedor) {
      contenedor.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!esVisible) return null;

  return (
    <button
      type="button"
      onClick={irArriba}
      className="scroll-to-top-btn"
      aria-label="Volver arriba"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}

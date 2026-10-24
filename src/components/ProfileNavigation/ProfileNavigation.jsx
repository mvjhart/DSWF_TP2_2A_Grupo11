import { useState } from "react";
import { Link } from "react-router";
import "./ProfileNavigation.css";

// Vite convierte cada imagen en su URL final (con hash en producción).
// La clave del objeto es la ruta absoluta: "/src/assets/images/..."
const imagenes = import.meta.glob(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,svg}",
  { eager: true, query: "?url", import: "default" },
);

export function ProfileNavigation({ integrantes, currentSlug }) {
  // Estado para imágenes que fallaron al cargar (404 / ruta rota)
  const [imgErrors, setImgErrors] = useState({});

  const currentIndex = integrantes.findIndex((i) => i.slug === currentSlug);
  const prevIndex =
    (currentIndex - 1 + integrantes.length) % integrantes.length;
  const nextIndex = (currentIndex + 1) % integrantes.length;

  const prevMember = integrantes[prevIndex];
  const nextMember = integrantes[nextIndex];

  const handleImgError = (slug) => {
    setImgErrors((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <nav
      className="profile-solar-nav"
      aria-label="Navegación entre integrantes"
    >
      {/* Botón Anterior */}
      <Link
        to={`/integrantes/${prevMember.slug}`}
        className="profile-solar-nav__arrow"
        aria-label={`Ir al perfil anterior: ${prevMember.nombre}`}
        title={`Anterior: ${prevMember.nombre}`}
      >
        <span aria-hidden="true">‹</span>
      </Link>

      {/* Track de Avatares */}
      <div className="profile-solar-nav__track">
        {integrantes.map((item) => {
          const isCurrent = item.slug === currentSlug;
          const initials = item.nombre
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("");

          const formattedName = item.slug
            ? item.slug.charAt(0).toUpperCase() + item.slug.slice(1)
            : item.nombre;

          // Traducimos la ruta del JSON a la URL que genera Vite
          const srcImagen =
            typeof item.imagen === "string"
              ? imagenes[`/${item.imagen}`]
              : undefined;

          const hasError = imgErrors[item.slug];

          return (
            <div key={item.slug} className="profile-solar-nav__item">
              <Link
                to={`/integrantes/${item.slug}`}
                className={`profile-solar-nav__avatar ${
                  isCurrent ? "profile-solar-nav__avatar--active" : ""
                }`}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`Ver perfil de ${item.nombre}`}
              >
                {/* 1. Iniciales (de fondo; se ven si no hay imagen o falla) */}
                <span
                  className="profile-solar-nav__initials"
                  aria-hidden="true"
                >
                  {initials}
                </span>

                {/* 2. Imagen (directa, sin fade) */}
                {srcImagen && !hasError && (
                  <img
                    src={srcImagen}
                    alt=""
                    className="profile-solar-nav__img"
                    onError={() => handleImgError(item.slug)}
                  />
                )}
              </Link>

              {/* Tooltip */}
              <span className="profile-solar-nav__tooltip" aria-hidden="true">
                {formattedName}
              </span>
            </div>
          );
        })}
      </div>

      {/* Botón Siguiente */}
      <Link
        to={`/integrantes/${nextMember.slug}`}
        className="profile-solar-nav__arrow"
        aria-label={`Ir al siguiente perfil: ${nextMember.nombre}`}
        title={`Siguiente: ${nextMember.nombre}`}
      >
        <span aria-hidden="true">›</span>
      </Link>
    </nav>
  );
}

export default ProfileNavigation;

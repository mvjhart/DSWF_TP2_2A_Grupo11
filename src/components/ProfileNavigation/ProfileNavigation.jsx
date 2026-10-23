import { useState } from "react";
import { Link } from "react-router";
import "./ProfileNavigation.css";

export function ProfileNavigation({ integrantes, currentSlug }) {
  // Estado para controlar qué imágenes ya cargaron
  const [loadedImgs, setLoadedImgs] = useState({});
  // Estado para imágenes que fallaron al cargar (404 / ruta rota)
  const [imgErrors, setImgErrors] = useState({});

  const currentIndex = integrantes.findIndex((i) => i.slug === currentSlug);
  const prevIndex =
    (currentIndex - 1 + integrantes.length) % integrantes.length;
  const nextIndex = (currentIndex + 1) % integrantes.length;

  const prevMember = integrantes[prevIndex];
  const nextMember = integrantes[nextIndex];

  const handleImgLoad = (slug) => {
    setLoadedImgs((prev) => ({ ...prev, [slug]: true }));
  };

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

          const isLoaded = loadedImgs[item.slug];
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
                {/* 1. Iniciales (Siempre presentes de fondo mientras carga o si falla) */}
                <span
                  className="profile-solar-nav__initials"
                  aria-hidden="true"
                >
                  {initials}
                </span>

                {/* 2. Imagen (Aparece suavemente cuando termina de cargar) */}
                {item.imagen && !hasError && (
                  <img
                    src={item.imagen}
                    alt=""
                    className={`profile-solar-nav__img ${
                      isLoaded ? "profile-solar-nav__img--loaded" : ""
                    }`}
                    onLoad={() => handleImgLoad(item.slug)}
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

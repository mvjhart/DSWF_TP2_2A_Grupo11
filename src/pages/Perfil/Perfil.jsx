import { useRef, useState } from "react";
import { Link, useParams } from "react-router";
import integrantes from "../../assets/data/integrantes.json";
import favoritos from "../../assets/data/favoritos.json";
import { esPendiente } from "../../utils/esPendiente";
import ProfileIdentity from "../../components/ProfileIdentity/ProfileIdentity";
import SkillsList from "../../components/SkillsList/SkillsList";
import FavoriteItemCard from "../../components/FavoriteItemCard/FavoriteItemCard";
import "./Perfil.css";

const TABS = [
  { id: "albumes", tipo: "album", etiqueta: "Álbumes" },
  { id: "peliculas", tipo: "pelicula", etiqueta: "Películas" },
];

function textoFaltantes(cantidad) {
  return cantidad === 1
    ? "Falta cargar 1 favorito."
    : `Faltan cargar ${cantidad} favoritos.`;
}

function PerfilContenido({ integrante }) {
  const { slug } = integrante;
  const tono = integrante.tono ?? "neutro";

  const grupos = TABS.map((tab) => {
    const todos = favoritos.filter(
      (f) => f.memberSlug === slug && f.tipo === tab.tipo,
    );
    const reales = todos.filter((f) => !esPendiente(f.titulo));
    return { ...tab, reales, pendientes: todos.length - reales.length };
  });

  const inicial = grupos.find((g) => g.reales.length > 0)?.id ?? TABS[0].id;
  const [activa, setActiva] = useState(inicial);
  const botones = useRef({});

  function manejarTeclado(evento, indice) {
    const ultimo = grupos.length - 1;
    let destino = null;

    if (evento.key === "ArrowRight")
      destino = indice === ultimo ? 0 : indice + 1;
    if (evento.key === "ArrowLeft")
      destino = indice === 0 ? ultimo : indice - 1;
    if (evento.key === "Home") destino = 0;
    if (evento.key === "End") destino = ultimo;
    if (destino === null) return;

    evento.preventDefault();
    const id = grupos[destino].id;
    setActiva(id);
    botones.current[id]?.focus();
  }

  return (
    <main className="perfil" data-tono={tono}>
      <Link to="/" className="perfil__volver" aria-label="Volver al inicio">
        <span aria-hidden="true">←</span> Volver al inicio
      </Link>

      <ProfileIdentity integrante={integrante} />

      <SkillsList habilidades={integrante.habilidades} />

      <section className="perfil__seccion" aria-labelledby="perfil-favoritos">
        <h2 id="perfil-favoritos" className="perfil__titulo">
          Favoritos
        </h2>

        <div
          className="perfil__tabs"
          role="tablist"
          aria-label="Tipo de favoritos"
        >
          {grupos.map((grupo, indice) => {
            const seleccionada = activa === grupo.id;
            return (
              <button
                key={grupo.id}
                ref={(el) => {
                  botones.current[grupo.id] = el;
                }}
                id={`tab-${grupo.id}`}
                type="button"
                role="tab"
                className="perfil__tab"
                aria-selected={seleccionada}
                aria-controls={`panel-${grupo.id}`}
                tabIndex={seleccionada ? 0 : -1}
                onClick={() => setActiva(grupo.id)}
                onKeyDown={(evento) => manejarTeclado(evento, indice)}
              >
                {grupo.etiqueta}
                <span className="perfil__tab-cantidad">
                  {grupo.reales.length}
                </span>
              </button>
            );
          })}
        </div>

        {grupos.map((grupo) => (
          <div
            key={grupo.id}
            id={`panel-${grupo.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${grupo.id}`}
            hidden={activa !== grupo.id}
            tabIndex={0}
            className="perfil__panel"
          >
            {grupo.reales.length > 0 ? (
              <ul className="perfil__favoritos">
                {grupo.reales.map((favorito) => (
                  <li key={favorito.id}>
                    <FavoriteItemCard favorito={favorito} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="perfil__vacio">
                {grupo.etiqueta} favoritos en construcción.
              </p>
            )}

            {grupo.reales.length > 0 && grupo.pendientes > 0 && (
              <p className="perfil__nota">{textoFaltantes(grupo.pendientes)}</p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

function Perfil() {
  const { slug } = useParams();
  const integrante = integrantes.find((i) => i.slug === slug);

  if (!integrante) {
    return (
      <main className="perfil perfil--no-encontrado">
        <h1>Perfil no encontrado</h1>
        <p>No existe un integrante con ese identificador.</p>
        <Link to="/" className="perfil__volver">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return <PerfilContenido key={slug} integrante={integrante} />;
}

export default Perfil;
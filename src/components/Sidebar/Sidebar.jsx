import { NavLink } from "react-router";
import "./Sidebar.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const enlaces = [
  { to: "/", label: "Quiénes somos" },
  { to: "/recursos", label: "Favoritos" },
  { to: "/api", label: "API pública" },
  { to: "/arbol", label: "Árbol de renderizado" },
  { to: "/bitacora", label: "Bitácora" },
];

function Sidebar({ isOpen, onNavigate, sidebarRef, esMovil, animar }) {

  const clasesSidebar = [
    "sidebar",
    esMovil && "sidebar--movil",
    isOpen && "sidebar--abierta",
    esMovil && animar && "sidebar--transicion",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside
      id="sidebar-principal"
      ref={sidebarRef}
      className={clasesSidebar}
      tabIndex={-1}
    >
      {esMovil && isOpen && (
        <button
          type="button"
          className="sidebar__close"
          onClick={onNavigate}
          aria-label="Cerrar menú de navegación"
        >
          Cerrar menú
        </button>
      )}

      <div className="sidebar__header">
        <h2>Grupo 11</h2>
        {!esMovil && <ThemeToggle />}
      </div>

      <nav aria-label="Menú de navegación">
        {enlaces.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={onNavigate}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

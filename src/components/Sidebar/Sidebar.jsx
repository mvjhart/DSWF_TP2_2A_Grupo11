import { NavLink } from "react-router";
import "./Sidebar.css";

const enlaces = [
  { to: "/", label: "Quiénes somos" },
  { to: "/recursos", label: "Favoritos" },
  { to: "/api", label: "API pública" },
  { to: "/arbol", label: "Árbol de renderizado" },
  { to: "/bitacora", label: "Bitácora" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Grupo 11</h2>
      <nav aria-label="Menú de navegación">
        {enlaces.map((enlace) => (
          <NavLink
            key={enlace.to}
            to={enlace.to}
            end={enlace.to === "/"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {enlace.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

/* src/components/Header/Header.jsx */

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";

function Header({ menuAbierto, onToggleMenu, botonMenuRef, inert}) {
  return (
    <header className="mobile-header" inert={inert}>
      <button
        ref={botonMenuRef}
        type="button"
        className="mobile-header__menu"
        aria-label={
          menuAbierto
            ? "Menú de navegación abierto"
            : "Abrir menú de navegación"
        }
        aria-expanded={menuAbierto}
        aria-controls="sidebar-principal"
        onClick={onToggleMenu}
      >
        <span className="hamburger-icon" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
      <ThemeToggle />
    </header>
  );
}

export default Header;

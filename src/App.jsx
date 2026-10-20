import { useCallback, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import useMediaQuery from "./hooks/useMediaQuery";
import "./App.css";

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const botonMenuRef = useRef(null);
  const sidebarRef = useRef(null);
  const devolverFocoRef = useRef(false);

  const esEscritorio = useMediaQuery("(min-width: 769px)");
  const esMovil = !esEscritorio;

  const cerrarMenu = useCallback(() => {
    // Devolvemos el foco después de que el header deje de estar inerte.
    devolverFocoRef.current = true;
    setMenuAbierto(false);
  }, []);

  function alternarMenu() {
    setMenuAbierto((abierto) => !abierto);
  }

  // En escritorio no necesitamos el menú desplegable.
  useEffect(() => {
    if (esEscritorio) {
      setMenuAbierto(false);
    }
  }, [esEscritorio]);

  // Restaura el foco cuando el menú ya se cerró y el botón vuelve
  // a estar disponible para recibirlo.
  useEffect(() => {
    if (menuAbierto || !devolverFocoRef.current) return;

    botonMenuRef.current?.focus();
    devolverFocoRef.current = false;
  }, [menuAbierto]);
 

  // Bloquea el scroll de la página mientras el menú está abierto.
  useEffect(() => {
    if (!menuAbierto || !esMovil) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflowAnterior;
    };
  }, [menuAbierto, esMovil]);

  return (
    <div className="app-layout">
      <Header
        menuAbierto={menuAbierto}
        onToggleMenu={alternarMenu}
        botonMenuRef={botonMenuRef}
        inert={esMovil && menuAbierto}
      />

      <Sidebar
        isOpen={menuAbierto}
        onNavigate={cerrarMenu}
        sidebarRef={sidebarRef}
        esMovil={esMovil}
      />

      <div 
        className="app-content"
        inert={esMovil && menuAbierto}
      >
        <Outlet />
        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

import { Outlet, Link } from "react-router";

function App() {
  return (
    <>
      <header>
        <h1>Vite + React</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/bitacora">Bitacora</Link>
        </nav>
      </header>
      <Outlet />
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
}

export default App;

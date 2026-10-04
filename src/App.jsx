import { Outlet, Link } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Vite + React</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/test">Test</Link>
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

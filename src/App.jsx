import { Outlet} from "react-router";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="">
        <Outlet />
        <footer>
          <p>Footer</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

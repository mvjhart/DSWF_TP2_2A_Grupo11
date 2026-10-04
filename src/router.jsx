import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Inicio from "./pages/Inicio/Inicio.jsx";
import Bitacora from "./pages/Bitacora/Bitacora.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Inicio,
      },
      {
        path: "bitacora",
        Component: Bitacora,
      },
    ],
  },
]);

export default router;

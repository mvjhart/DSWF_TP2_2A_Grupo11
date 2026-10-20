import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Inicio from "./pages/Inicio/Inicio.jsx";
import Bitacora from "./pages/Bitacora/Bitacora.jsx";
import Perfil from "./pages/Perfil/Perfil.jsx";
import Recursos from "./pages/Recursos/Recursos.jsx";
import Api from "./pages/Api/Api.jsx";
import Arbol from "./pages/Arbol/Arbol.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

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
      {
        path: "integrantes/:slug",
        Component: Perfil,
      },
      {
        path: "recursos",
        Component: Recursos,
      },
      {
        path: "api",
        Component: Api,
      },
      {
        path: "arbol",
        Component: Arbol,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);

export default router;

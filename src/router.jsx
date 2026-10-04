import { createBrowserRouter } from "react-router";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Test from "./Test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "test",
        Component: Test,
      },
    ],
  },
]);

export default router;

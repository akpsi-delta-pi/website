import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Brothers } from "./pages/Brothers";
import { Alumni } from "./pages/Alumni";
import { Rush } from "./pages/Rush";
import { Resources } from "./pages/Resources";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "members", element: <Brothers /> },
        { path: "alumni", element: <Alumni /> },
        { path: "rush", element: <Rush /> },
        { path: "resources", element: <Resources /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

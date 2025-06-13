// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

// Import the main app component
import App from "./App";
import About from "./pages/About";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import Anime from "./pages/Anime";
import Cgv from "./pages/Cgv";
import Favorite from "./pages/Favorite";
import Genre from "./pages/Genre";
import Historic from "./pages/Historic";
import Home from "./pages/Home";
import LegalNotices from "./pages/LegalNotices";
import Watch from "./pages/Watch";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Account",
        element: <Account />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
      {
        path: "/Anime",
        element: <Anime />,
      },
      {
        path: "/Cgv",
        element: <Cgv />,
      },
      {
        path: "/Favorite",
        element: <Favorite />,
      },
      {
        path: "/Genre",
        element: <Genre />,
      },
      {
        path: "/Historic",
        element: <Historic />,
      },
      {
        path: "/LegalNotices",
        element: <LegalNotices />,
      },
      {
        path: "/Watch",
        element: <Watch />,
      },
    ],
  },
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

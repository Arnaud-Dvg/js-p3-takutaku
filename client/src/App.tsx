//Update Header
import "./App.css";
import { Outlet } from "react-router-dom";

import { AnimeProvider } from "../context/AnimeContext";
import Header from "./components/Header/DesktopNavBar";

function App() {
  return (
    <>
      <div>
        <AnimeProvider>
          <Header />
          <Outlet />
        </AnimeProvider>
      </div>
    </>
  );
}

export default App;

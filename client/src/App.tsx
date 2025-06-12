import "./App.css";
import { Outlet } from "react-router-dom";

import { AnimeProvider } from "../context/AnimeContext";

function App() {
  return (
    <>
      <div>
        <AnimeProvider>
          <Outlet />
        </AnimeProvider>
      </div>
    </>
  );
}

export default App;

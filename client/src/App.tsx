import "./App.css";
import { Outlet } from "react-router-dom";

import { AnimeProvider } from "../context/AnimeContext";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <AnimeProvider>
          <Outlet />
        </AnimeProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;

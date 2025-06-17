//Update Header
import "./App.css";
import { Outlet } from "react-router-dom";
import { AnimeProvider } from "../context/AnimeContext";
import Header from "./components/Header/DesktopNavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div>
        <AnimeProvider>
          <Header />
          <Outlet />
        </AnimeProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;

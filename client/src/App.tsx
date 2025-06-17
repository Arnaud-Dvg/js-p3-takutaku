//Update Header
import "./App.css";
import { Outlet } from "react-router-dom";
import { AnimeProvider } from "../context/AnimeContext";
import Footer from "./components/Footer";
import Header from "./components/Header/DesktopNavBar";

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

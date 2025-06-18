//Update Header
import "./App.css";
import { Outlet } from "react-router-dom";
import { AnimeProvider } from "../context/AnimeContext";
import { UserProvider } from "../context/UserContext";
import Footer from "./components/Footer";
import Header from "./components/Header/DesktopNavBar";

function App() {
  return (
    <>
      <div>
        <AnimeProvider>
          <UserProvider>
            <Header />
            <Outlet />
          </UserProvider>
        </AnimeProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;

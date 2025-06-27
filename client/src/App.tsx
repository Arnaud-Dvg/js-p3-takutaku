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
      <div className="min-h-screen flex flex-col">
        <UserProvider>
          <AnimeProvider>
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </AnimeProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;

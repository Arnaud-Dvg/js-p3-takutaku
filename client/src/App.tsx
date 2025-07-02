//Update Header
import "./App.css";
import { Outlet } from "react-router-dom";
import { AnimeProvider } from "../context/AnimeContext";
import { AuthProvider } from "../context/AuthContext";
import { UserProvider } from "../context/UserContext";
import Footer from "./components/Footer";
import Header from "./components/Header/DesktopNavBar";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <UserProvider>
          <AuthProvider>
            <AnimeProvider>
              <Header />
              <main className="flex-1">
                <Outlet />
              </main>
              <Footer />
            </AnimeProvider>
          </AuthProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;

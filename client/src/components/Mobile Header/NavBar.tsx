import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import BurgerProfil from "../UserMenu/BurgerProfil";
import BurgerButton from "./BurgerButton";

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const toggleMenu = () => setIsNavOpen((prev) => !prev);
  const { connected } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isGenrePage = location.pathname === "/genre";
  const isFavoritePage = location.pathname === "/favorite";

  const handleClick = () => {
    const storedUser = localStorage.getItem("Utilisateur connecté");
    if (!storedUser) {
      navigate("/login");
    } else {
      setIsBurgerOpen((prev) => !prev); // toggle
    }
  };

  const handleCloseBurger = () => {
    setIsBurgerOpen(false);
  };

  return (
    <>
      <section>
        <section className="relative flex items-center justify-between px-2 py-4">
          <BurgerButton toggleMenu={toggleMenu} isOpen={isNavOpen} />
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <img
              src="/logo_taku.png"
              className="h-12 object-cover"
              alt="Logo Taku Taku"
            />
          </div>
          <div className="flex items-center space-x-1">
            <button
              type="button"
              className="w-9 h-9 p-1 z-10"
              onClick={handleClick}
            >
              <img
                src={!connected ? "/avatar.svg" : "/profilpicture.png"}
                alt="Avatar Icon"
                className={!connected ? "" : "rounded-full"}
              />
            </button>
          </div>
        </section>

        <nav
          className={`
            fixed left-0 h-full -m-[15px] pt-5 w-1/3 z-40
            bg-[var(--color-primary)] text-tertiary
            transform transition-transform duration-300
            ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <ul className="mt-5 px-8">
            <Link to="/">
              <li className={`pb-5 ${isHomePage ? "text-secondary" : ""}`}>
                ACCUEIL
              </li>
            </Link>
            <Link to="/genre">
              <li className={`pb-5 ${isGenrePage ? "text-secondary" : ""}`}>
                GENRES
              </li>
            </Link>
            <Link to="/favorite">
              <li className={`pb-5 ${isFavoritePage ? "text-secondary" : ""}`}>
                FAVORIS
              </li>
            </Link>
          </ul>
        </nav>
      </section>

      {/* Menu utilisateur contrôlé */}
      <BurgerProfil isOpen={isBurgerOpen} onClose={handleCloseBurger} />
    </>
  );
}

export default NavBar;

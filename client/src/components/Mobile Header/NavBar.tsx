// NavBar Mobile
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BurgerButton from "./BurgerButton";
import SearchBar from "./SearchBar";

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsNavOpen((prev) => !prev);
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isGenrePage = location.pathname === "/genre";
  const isFavoritePage = location.pathname === "/favorite";

  return (
    <>
      <section>
        <section className="relative flex items-center justify-between px-2 py-4">
          <BurgerButton toggleMenu={toggleMenu} isOpen={isNavOpen} />
          {!isSearchOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <Link to={"/"}>
              <img
                src="/logo_taku.png"
                className="h-12 object-cover"
                alt="Logo Taku Taku"
              />
              </Link>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
            <Link to="/login">
              <button type="button" className="w-9 h-9 p-1 z-10">
                <img src="/avatar.svg" alt="Avatar Icon" />
              </button>
            </Link>
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
    </>
  );
}

export default NavBar;

import { useState } from "react";
import BurgerButton from "./BurgerButton";
import SearchBar from "./SearchBar";

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <>
      <section>
        <section className="relative flex items-center justify-between px-2 py-3">
          <BurgerButton toggleMenu={toggleMenu} isOpen={isNavOpen} />
          {!isSearchOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
              <img
                src="/logo_taku.png"
                className="h-16 "
                alt="Logo Taku Taku"
              />
            </div>
          )}
          <div className="flex items-center space-x-1">
            <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
            <img
              src="/avatar.svg"
              alt="Avatar Icon"
              className="w-9 h-9 p-1 z-10"
            />
          </div>
        </section>
        <nav
          className={`
    fixed left-0 h-full -m-[15px] pt-5 w-1/3 z-40 
    bg-[var(--color-primary)] text-white 
    transform transition-transform duration-300 
    ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          <ul className="mt-5">
            <li className="text-white pb-5">Accueil</li>
            <li className="text-white pb-5">Genre</li>
            <li className="text-white">Favoris</li>
          </ul>
        </nav>
      </section>
    </>
  );
}

export default NavBar;

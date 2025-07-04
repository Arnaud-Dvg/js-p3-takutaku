import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

//NavBar Desktop
import NavBar from "../Mobile Header/NavBar";
import BurgerProfil from "../UserMenu/BurgerProfil";

function Header() {
  const { connected } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const isGenrePage = location.pathname === "/genre";
  const isFavoritePage = location.pathname === "/favorite";
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleClick = () => {
    const storedUser = localStorage.getItem("userConnected");
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
      <div className="block md:hidden">
        <NavBar />
      </div>
      <section className="hidden md:flex items-center w-full p-3">
        <div className="flex justify-start flex-1 z-10">
          <Link to="/">
            <img
              src="/logo_taku.png"
              alt="logo"
              className="z-50 h-14 object-cover"
            />
          </Link>
        </div>
        <nav className="flex justify-center flex-1 relative">
          <ul className="hidden md:flex z-50 text-tertiary text-lg gap-30">
            <li>
              <Link
                to="/"
                className={
                  isHomePage
                    ? "border-b-3 border-secondary pb-7"
                    : "hover:border-tertiary hover:border-b-3 hover:pb-7"
                }
              >
                ACCUEIL
              </Link>
            </li>
            <li>
              <Link
                to="/genre"
                className={
                  isGenrePage
                    ? "border-b-3 border-secondary pb-7"
                    : "hover:border-tertiary hover:border-b-3 hover:pb-7"
                }
              >
                GENRES
              </Link>
            </li>
            <li>
              <Link
                to="/favorite"
                className={
                  isFavoritePage
                    ? "border-b-3 border-secondary pb-7"
                    : "hover:border-tertiary hover:border-b-3 hover:pb-7"
                }
              >
                FAVORIS
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex justify-end flex-1">
          <button type="button" className="w-9 h-9 p-1 z-10 cursor-pointer">
            <img
              src={!connected ? "/avatar.svg" : "/profilpicture.png"}
              alt="Avatar Icon"
              className={!connected ? "" : "rounded-full"}
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick();
                }
              }}
            />
          </button>
        </div>
      </section>
      <hr className="hidden md:block border-b border-gray-600 z-30 relative" />

      <BurgerProfil isOpen={isBurgerOpen} onClose={handleCloseBurger} />
    </>
  );
}

export default Header;

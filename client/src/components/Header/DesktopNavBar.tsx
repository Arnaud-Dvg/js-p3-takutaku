import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
//NavBar Desktop
import NavBar from "../Mobile Header/NavBar";

function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isGenrePage = location.pathname === "/genre";
  const isFavoritePage = location.pathname === "/favorite";

  return (
    <>
      <div className="block md:hidden">
        <NavBar />
      </div>

      <section className="hidden md:flex items-center w-full p-3">
        <div className="flex justify-start flex-1 z-10">
          <Link to={"/"}>
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
          <Link to="/login">
            <button type="button" className="w-9 h-9 p-1 z-10">
              <img src="/avatar.svg" alt="Avatar Icon" />
            </button>
          </Link>
        </div>
      </section>
      <hr className="hidden md:block border-b border-gray-600 z-30 relative" />
    </>
  );
}

export default Header;

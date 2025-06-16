import NavBar from "../Mobile Header/NavBar";

function Header() {
  return (
    <>
      <div className="block md:hidden">
        <NavBar />
      </div>

      <section className="hidden md:flex flex items-center w-full px-4 py-1">
        <div className="flex justify-start flex-1 z-10 w-20 h-25">
          <img src="/logo_taku.png" alt="logo" className="z-50 w-20 h-25" />
        </div>
        <nav className="flex justify-center flex-1">
          <ul className="hidden md:flex z-10 text-white flex gap-40">
            <li>ACCUEIL</li>
            <li>GENRES</li>
            <li>FAVORIS</li>
          </ul>
        </nav>
        <div className="flex justify-end flex-1">
          <img src="/avatar.svg" alt="avatar" className="z-10" />
        </div>
      </section>
    </>
  );
}

export default Header;

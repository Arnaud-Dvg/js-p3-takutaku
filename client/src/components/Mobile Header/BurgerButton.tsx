//Bouton Burger avec animation
type BurgerProps = {
  toggleMenu: () => void;
  isOpen: boolean;
};

function Burger({ toggleMenu, isOpen }: BurgerProps) {
  return (
    <section className="z-50 rounded-sm h-9 w-10 cursor-pointer p-1">
      <div onClick={toggleMenu} onKeyDown={toggleMenu}>
        <div className="relative w-11 h-11">
          <span
            className={`absolute left-0 h-0.5 w-8 bg-white transform transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 top-2.5" : "top-0"
            }`}
          />

          <span
            className={`absolute left-0 h-0.5 w-8 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : "top-2.5"
            }`}
          />
          <span
            className={`absolute left-0 h-0.5 w-8 bg-white transform transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 top-2.5" : "top-5"
            }`}
          />
        </div>
      </div>
    </section>
  );
}

export default Burger;

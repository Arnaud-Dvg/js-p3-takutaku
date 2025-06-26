// NavBar Mobile

import { Link } from "react-router-dom";

function BurgerProfil({ onClose }: { onClose: () => void }) {
  return (
    <>
      <section>
        <nav
          className={`
    fixed right-0 h-full -m-[15px] pt-5 w-1/3 z-40
    bg-[var(--color-primary)] text-tertiary
    
  `}
        >
          <ul className="mt-5 px-8">
            <li>
              <Link to="/account">
                <button
                  className="text-tertiary"
                  onClick={onClose}
                  type="button"
                >
                  Mon Compte
                </button>
              </Link>
            </li>
            <Link to="/history">
              <li className="text-tertiary">Mes animés visionnés</li>
            </Link>
          </ul>
        </nav>
      </section>
    </>
  );
}

export default BurgerProfil;

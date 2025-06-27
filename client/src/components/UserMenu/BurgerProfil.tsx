import { Link } from "react-router-dom";

function BurgerProfil({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <nav
      className={`
        fixed top-0 right-0 h-full w-30 z-50
        bg-[var(--color-primary)] text-tertiary
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Bouton de fermeture */}
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-2xl text-white"
      >
        <span className="absolute  h-0.5 w-8 bg-white rotate-45 top-2.5 top-4 right-0" />
        <span className="absolute  h-0.5 w-8 bg-white -rotate-45 top-2.5 top-4 right-0" />
      </button>

      <ul className="mt-10 px-4">
        <Link to="/account" onClick={onClose}>
          <li className="mt-20 text-tertiary">Mon Compte</li>
        </Link>
        <Link to="/history" onClick={onClose}>
          <li className="pt-4 text-tertiary">Historique</li>
        </Link>
      </ul>
    </nav>
  );
}

export default BurgerProfil;

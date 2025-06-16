//SearchBar Mobile
import { type Dispatch, type SetStateAction, useEffect, useRef } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function SearchBar({ isOpen, setIsOpen }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative flex items-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Rechercher..."
        className={`absolute right-0 transition-all duration-500 ease-in-out z-10 h-8 rounded-full bg-black text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] ${
          isOpen
            ? "w-60 md:w-64 opacity-100 px-4"
            : "w-0 opacity-0 px-0 pointer-events-none"
        }`}
      />
      <img
        src="/search.svg"
        alt="search"
        className="w-9 h-9 p-1 z-10 cursor-pointer transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setIsOpen(!isOpen);
          }
        }}
      />
    </div>
  );
}

export default SearchBar;

import { useEffect, useState } from "react";

interface Type {
  id: number;
  name: string;
}

function ButtonType() {
  const [types, setTypes] = useState<Type[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3310/api/type")
      .then((res) => res.json())
      .then((data) => setTypes(data));
  }, []);

  function handleSelectType(id: number): void {
    console.log("Selected type id:", id);
  }

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="group transition-all duration-200 w-[150px] py-2 flex flex-row items-center justify-center bg-secondary gap-2 rounded-full font-semibold text-sm"
      >
        <span>TYPE</span>
        <svg
          className={`transition-transform duration-300 cursor-pointer ${
            isOpen ? "rotate-180" : "rotate-90"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <title>Dérouler les types</title>
          <path
            fill="currentColor"
            d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-2 w-full p-2 bg-secondary rounded-lg flex flex-col gap-2">
          {types.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleSelectType(type.id)}
              className="cursor-pointer text-left font-semibold text-sm transition duration-300 ease-in-out hover:translate-x-2 px-2 uppercase"
            >
              {type.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ButtonType;

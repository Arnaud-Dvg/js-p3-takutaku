import SearchBarGenre from "./ShearchBarGenre";

function ButtonsGenre() {
  return (
    <div className="md:flex md:justify-between md:mx-50">
      <div className="md:flex md:gap-10">
        <button
          className="bg-secondary w-[150px] py-2 rounded-full font-semibold text-sm"
          type="button"
        >
          GENRE
        </button>
        <button
          className="bg-secondary w-[150px] py-2 rounded-full font-semibold text-sm"
          type="button"
        >
          TYPE
        </button>
      </div>
      <SearchBarGenre />
    </div>
  );
}

export default ButtonsGenre;

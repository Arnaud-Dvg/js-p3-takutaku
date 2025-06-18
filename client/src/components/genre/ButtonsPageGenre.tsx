import ButtonGenre from "./ButtonGenre";
import ButtonType from "./ButtonType";
import SearchBarGenre from "./ShearchBarGenre";

function ButtonsPageGenre() {
  return (
    <div className="md:flex md:justify-between md:mx-50">
      <div className="md:flex md:gap-10">
        <ButtonGenre />
        <ButtonType />
      </div>
      <SearchBarGenre />
    </div>
  );
}

export default ButtonsPageGenre;

import ButtonGenre from "./ButtonGenre";
import ButtonType from "./ButtonType";
import SearchBarGenre from "./ShearchBarGenre";

function ButtonsPageGenre() {
  return (
    <div className="flex xl:justify-between xl:items-center xl:gap-10 xl:mx-50 md:mx-20 md:justify-between mt-10">
      <div className="flex mx-auto gap-4 md:mr-10 md:mx-0 xl:mx-0">
        <ButtonGenre />
        <ButtonType />
      </div>
      <SearchBarGenre />
    </div>
  );
}

export default ButtonsPageGenre;

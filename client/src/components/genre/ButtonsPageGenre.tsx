import ButtonGenre from "./ButtonGenre";
import ButtonType from "./ButtonType";
import SearchBarGenre from "./ShearchBarGenre";

type ButtonsPageGenreProps = {
  setGenre: (genre: string) => void;
  setType: (type: string) => void;
};

function ButtonsPageGenre({ setGenre, setType }: ButtonsPageGenreProps) {
  return (
    <div className="flex items-center xl:justify-between xl:gap-10 xl:mx-50 md:mx-20 md:justify-between mt-10">
      <div className="flex mx-auto gap-4 md:mr-10 md:mx-0 xl:mx-0">
        <ButtonGenre setGenre={setGenre} />
        <ButtonType setType={setType} />
      </div>
      <SearchBarGenre />
    </div>
  );
}

export default ButtonsPageGenre;

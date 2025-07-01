import { useState } from "react";
import ButtonsPageGenre from "../components/genre/ButtonsPageGenre";
import CarouselGenre from "../components/genre/CarouselGenre";
import SearchCarousel from "../components/genre/SearchCarousel";

function Genre() {
  const [genre, setGenre] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  return (
    <>
      <ButtonsPageGenre setGenre={setGenre} setType={setType} />
      {genre && genre !== "all" || type && type!== "all" ? (
        <SearchCarousel genre={Number(genre)} type={String(type)} />
      ) : (
        <CarouselGenre />
      )}
    </>
  );
}

export default Genre;

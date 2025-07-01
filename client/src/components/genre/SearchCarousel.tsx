import { useRef, useEffect } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import type { Anime } from "../../../context/AnimeContext";
import { useAnimeContext } from "../../../context/AnimeContext";

interface propsFilter {
  genre: number;
  type: string;
}

function SearchCarousel({ genre, type }: propsFilter) {
  const { animeSearch, fetchAnimeType, setAnimeSelected } = useAnimeContext();
  const swiperRefSearch = useRef<SwiperType | null>(null);

  const handleClick = (anime: Anime) => {
    setAnimeSelected(anime);
  };

  // Fonction pour les boutons gauche/droite pour les Seinens
  function setNextSearch() {
    swiperRefSearch.current?.slideNext();
  }
  function setPrevSearch() {
    swiperRefSearch.current?.slidePrev();
  }

  useEffect(() => {
    fetchAnimeType(genre, type);
  }, [genre, type]);

  return (
    <div className="relative mt-10 md:mt-15 mx-10 xl:mx-50 lg:mx-20">
      <h2 className="text-white text-xl mb-3">
        {genre} - {type}
      </h2>
      <div className="relative">
        {/* Bouton gauche */}
        <RxChevronLeft
          onClick={setPrevSearch}
          className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
        />

        {/* Bouton droit */}
        <RxChevronRight
          onClick={setNextSearch}
          className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
        />
        <Swiper
          onSwiper={(swiper) => {
            swiperRefSearch.current = swiper;
          }}
          slidesPerView={6}
          spaceBetween={20}
          breakpoints={{
            350: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          className="mySwiper"
        >
          {animeSearch.length > 0 ? (
            animeSearch
              .map((anime, index) => (
                <SwiperSlide
                  key={index}
                  style={{ width: "300px", cursor: "pointer" }}
                >
                  <div>
                    <Link to={"/anime"} onClick={() => handleClick(anime)}>
                      <img
                        src={anime.portrait}
                        alt={anime.title}
                        className="w-full rounded-sm"
                      />
                    </Link>
                    <p className="text-[0.6rem] md:text-[0.8rem] font-light text-white text-center mt-2">
                      {anime.title}
                    </p>
                  </div>
                </SwiperSlide>
              ))
          ) : (
            <p>Chargement...</p>
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default SearchCarousel;

// Import react and necessary hooks
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useAnimeContext } from "../../../../client/context/AnimeContext";
import type { Anime } from "../../../../client/context/AnimeContext";

import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import for Swiper
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-coverflow";

import WatchButton from "../../components/home/WatchButton";
// Import components
import DesktopSearchBar from "../header/DesktopSearchBar";

// Import icons
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Link } from "react-router";

function Carousel() {
  const [selectAnime, setSelectAnime] = useState<Anime[]>([]);
  const { getAnimebyId, setAnimeSelected } = useAnimeContext();
  const [animeIndex, setAnimeIndex] = useState<number>(2);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleClick = (anime: Anime) => {
    setAnimeSelected(anime);
  };

  useEffect(() => {
    Promise.all([
      getAnimebyId(17),
      getAnimebyId(19),
      getAnimebyId(1),
      getAnimebyId(2),
      getAnimebyId(16),
      getAnimebyId(20),
      getAnimebyId(5),
    ]).then((data) => {
      setSelectAnime(data.filter((anime): anime is Anime => anime !== null));
    });
  }, [getAnimebyId]);

  // Fonction des boutons
  function setNextR() {
    swiperRef.current?.slideNext();
  }

  function setNextL() {
    swiperRef.current?.slidePrev();
  }

  return (
    <section
      className="relative bg-cover bg-center transition-[background-image] duration-500 mt-6"
      style={{
        backgroundImage: `url(${selectAnime[animeIndex]?.paysage})`,
      }}
    >
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-20 pb-2">
        <DesktopSearchBar />
      </div>
      {/* Calque de flou par-dessus l'image de fond */}
      <div className="absolute top-6 inset-0 bg-black/50 backdrop-blur-xs z-0 scale-[1.2]" />

      {/* Contenu principal au-dessus du flou */}
      <div className="relative z-10 pt-8">
        <div className="relative pt-5 ">
          {/* Bouton gauche */}
          <RxChevronLeft
            aria-label="Précédent"
            role="button"
            type="button"
            onClick={setNextL}
            className=" lg:flex lg:absolute lg:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:bg-[var(--color-secondary)] lg:rounded-full lg:w-8 lg:h-8 lg:z-10 hidden "
          />
          <div>
            {/* Bouton droit */}
            <RxChevronRight
              aria-label="Suivant"
              role="button"
              type="button"
              onClick={setNextR}
              className=" lg:flex lg:absolute lg:right-4 lg:top-1/2 lg:-translate-y-1/2 lg:bg-[var(--color-secondary)] lg:rounded-full lg:w-8 lg:h-8 lg:z-10 hidden"
            />
          </div>

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={true}
            initialSlide={2}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 55,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            className="w-full h-full"
            onSlideChange={(swiper) => {
              setAnimeIndex(swiper.realIndex);
            }}
          >
            {selectAnime.length > 0 ? (
              selectAnime.map((anime) => (
                <SwiperSlide
                  key={anime.id}
                  style={{ width: "300px", cursor: "pointer" }}
                  onClick={() => handleClick(anime)}
                >
                  <div>
                    <img
                      src={anime.portrait}
                      alt={anime.title}
                      className="w-full rounded-sm h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p>Chargement...</p>
            )}
          </Swiper>
        </div>
        {selectAnime[animeIndex] && (
          <div className="relative z-10 text-center text-white p-4">
            <h2 className="relative z-10 text-center text-tertiary p-4">
              {selectAnime[animeIndex].title}
            </h2>
            <div className="text-[8px] text-tertiary px-4 lg:px-0">
              <div className="flex justify-center">
                <p className="text-center max-w-xl md:text-xs">
                  {selectAnime[animeIndex].synopsis}
                </p>
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  className="bg-[var(--color-secondary)] text-[var(--color-primary)] py-1 px-4 !rounded-full font-semibold !text-xs"
                >
                  <Link
                    to="/anime"
                    onClick={() => handleClick(selectAnime[animeIndex])}
                  >
                    Détails
                  </Link>
                </button>
              </div>
              <div className="mt-2 flex justify-center lg:justify-end">
                <WatchButton anime={selectAnime[animeIndex]} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Carousel;

import { useEffect, useState } from "react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper/types";
import { useAnimeContext } from "../../../../client/context/AnimeContext";
import type { Anime } from "../../../../client/context/AnimeContext";

import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
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

  // Fonction des boutons

  function setNextR() {
    swiperRef.current?.slideNext();
  }

  function setNextL() {
    swiperRef.current?.slidePrev();
  }

  return (
    <section
      className="relative bg-cover bg-center transition-[background-image] duration-500"
      style={{
        backgroundImage: `url(${selectAnime[animeIndex]?.paysage})`,
      }}
    >
      {/* Calque de flou par-dessus l'image de fond */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-0 scale-[1.2]" />

      {/* Contenu principal au-dessus du flou */}
      <div className="relative z-10 pt-8">
        <div className="relative ">
          {/* Bouton gauche */}
          <RxChevronLeft
            type="button"
            onClick={setNextL}
            className=" lg:flex lg:absolute lg:left-4 lg:top-1/2 lg:-translate-y-1/2 lg:bg-[var(--color-secondary)] lg:rounded-full lg:w-8 lg:h-8 lg:z-10 hidden "
          />
          <div>
            {/* Bouton droit */}
            <RxChevronRight
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
          <div className="relative z-10 text-center text-white p-4">st
            <h2 className="text-sm uppercase">
              {selectAnime[animeIndex].title}
            </h2>
            <div className="mt-2 grid grid-cols-1 lg:grid-cols-[3fr_4fr_3fr] lg:items-center lg:gap-4 text-[8px] text-white">

              <div className="hidden lg:block" />
              <div className="flex justify-center px-2">
                <p className="text-center max-w-xl">
                  {selectAnime[animeIndex].synopsis}
                </p>
              </div>

              {/* Bouton à droite */}
              <div className="mt-2 lg:mt-0 flex justify-center lg:justify-end">
                <Link to="/watch">
                  <button
                    type="button"
                    onClick={() => handleClick(selectAnime[animeIndex])}
                    className="bg-[var(--color-secondary)] text-[var(--color-primary)] py-1 px-4 !rounded-full font-medium !text-lg"
                  >
                    COMMENCER À REGARDER
                  </button>
                </Link>
              </div>
            </div>

            {/* Bouton détails centré en dessous */}
            <div className="mt-2">
              <button
                type="button"
                className="bg-[var(--color-secondary)] text-[var(--color-primary)] py-1 px-4 !rounded-full font-semibold !text-md"
              >
                Détails
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Carousel;

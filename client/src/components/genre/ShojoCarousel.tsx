import { useEffect, useState } from "react";
import { useRef } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import type { Anime } from "../../../../client/context/AnimeContext";
import { useAnimeContext } from "../../../../client/context/AnimeContext";

function ShojoCarousel() {
  const [shojoAnime, setShojoAnime] = useState<Anime[]>([]);
  const { anime } = useAnimeContext();
  const swiperRefShojo = useRef<SwiperType | null>(null);

  useEffect(() => {
    const filtered = anime.filter((anime) => anime.genre_id === 3);
    setShojoAnime(filtered);
  }, [anime]);

  const handleClick = (anime: Anime) => {
    console.log("Clicked on", anime.title);
  };

  // Fonction pour les boutons gauche/droite pour les Shonens
  function setNextShojo() {
    swiperRefShojo.current?.slideNext();
  }
  function setPrevShojo() {
    swiperRefShojo.current?.slidePrev();
  }
  return (
    <div className="relative mt-10 md:mt-15">
      <h2 className="text-white text-xl mb-3">Shojo</h2>
      <div className="relative">
        {/* Bouton gauche */}
        <RxChevronLeft
          onClick={setPrevShojo}
          className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
        />

        {/* Bouton droit */}
        <RxChevronRight
          onClick={setNextShojo}
          className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
        />
        <Swiper
          onSwiper={(swiper) => {
            swiperRefShojo.current = swiper;
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
          {shojoAnime.length > 0 ? (
            shojoAnime.map((anime) => (
              <SwiperSlide
                key={anime.id}
                style={{ width: "300px", cursor: "pointer" }}
                onClick={() => handleClick(anime)}
              >
                <div>
                  <img
                    src={anime.portrait}
                    alt={anime.title}
                    className="w-full rounded-sm"
                  />
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

export default ShojoCarousel;

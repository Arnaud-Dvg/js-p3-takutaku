import { useEffect, useState } from "react";
import { useAnimeContext } from "../../../../client/context/AnimeContext";
import type { Anime } from "../../../../client/context/AnimeContext";

import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";

function Carousel() {
  const [selectAnime, setSelectAnime] = useState<Anime[]>([]);
  const { getAnimebyId } = useAnimeContext();
  const [animeIndex, setAnimeIndex] = useState<number>(2);

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

  const handleClick = (anime: Anime) => {
    console.log("Clicked on", anime.title);
  };

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
        <Swiper
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
            depth: 50,
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
                    className="w-full rounded-sm"
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
        <div className="relative z-10 text-center text-white p-4 max-w-xl mx-auto">
          <h2 className="text-sm uppercase">{selectAnime[animeIndex].title}</h2>
          <p className="text-[8px]">{selectAnime[animeIndex].synopsis}</p>
        </div>
      )}
    </section>
  );
}

export default Carousel;

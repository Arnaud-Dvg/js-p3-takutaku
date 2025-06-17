import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Anime } from "../../../../client/context/AnimeContext";
import { useAnimeContext } from "../../../../client/context/AnimeContext";

function CarouselGenre() {
  const [selectAnime, setSelectAnime] = useState<Anime[]>([]);
  const [shonenAnime, setShonenAnime] = useState<Anime[]>([]);
  const [seinenAnime, setSeinenAnime] = useState<Anime[]>([]);
  const [shojoAnime, setShojoAnime] = useState<Anime[]>([]);
  const { getAnimebyId } = useAnimeContext();
  const { anime } = useAnimeContext();

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

  // useEffect pour les Shonen
  useEffect(() => {
    const filtered = anime.filter((anime) => anime.genre_id === 1);
    setShonenAnime(filtered);
  }, [anime]);

  // useEffect pour les Seinen
  useEffect(() => {
    const filtered = anime.filter((anime) => anime.genre_id === 2);
    setSeinenAnime(filtered);
  }, [anime]);

  // useEffect pour les Shojo
  useEffect(() => {
    const filtered = anime.filter((anime) => anime.genre_id === 3);
    setShojoAnime(filtered);
  }, [anime]);

  const handleClick = (anime: Anime) => {
    console.log("Clicked on", anime.title);
  };

  return (
    <>
      <section className="mx-15">
        {/* ****************** Caroussel Populaire ****************** */}
        <div className="mt-10 md:mt-15">
          <h2 className="text-white text-xl mb-3">Populaire</h2>
          <Swiper
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
                    <p className="text-[0.5rem] font-light text-white text-center mt-2">
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

        {/* ****************** Caroussel Shonen ****************** */}
        <div className="mt-10 md:mt-15">
          <h2 className="text-white text-xl mb-3">Shonen</h2>
          <Swiper
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
            {selectAnime.length > 0 ? (
              shonenAnime.map((anime) => (
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
                    <p className="text-[0.5rem] font-light text-white text-center mt-2">
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

        {/* ****************** Caroussel Seinen ****************** */}
        <div className="mt-10 md:mt-15">
          <h2 className="text-white text-xl mb-3">Seinen</h2>
          <Swiper
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
            {selectAnime.length > 0 ? (
              seinenAnime.map((anime) => (
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
                    <p className="text-[0.5rem] font-light text-white text-center mt-2">
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

        {/* ****************** Caroussel Shojo ****************** */}
        <div className="mt-10 md:mt-15">
          <h2 className="text-white text-xl mb-3">Shojo</h2>
          <Swiper
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
            {selectAnime.length > 0 ? (
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
                    <p className="text-[0.5rem] font-light text-white text-center mt-2">
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
      </section>
    </>
  );
}

export default CarouselGenre;

import { useEffect, useState } from "react";
import { useRef } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import type { Anime } from "../../../../client/context/AnimeContext";
import { useAnimeContext } from "../../../../client/context/AnimeContext";

function CarouselGenre() {
  const [selectAnime, setSelectAnime] = useState<Anime[]>([]);
  const [shonenAnime, setShonenAnime] = useState<Anime[]>([]);
  const [seinenAnime, setSeinenAnime] = useState<Anime[]>([]);
  const [shojoAnime, setShojoAnime] = useState<Anime[]>([]);
  const { getAnimebyId } = useAnimeContext();
  const { anime } = useAnimeContext();
  const swiperRefPopulaire = useRef<SwiperType | null>(null);
  const swiperRefShonen = useRef<SwiperType | null>(null);
  const swiperRefSeinen = useRef<SwiperType | null>(null);
  const swiperRefShojo = useRef<SwiperType | null>(null);

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

  // Fonction pour les boutons gauche/droite pour les Populaires
  function setNextPopulaire() {
    swiperRefPopulaire.current?.slideNext();
  }
  function setPrevPopulaire() {
    swiperRefPopulaire.current?.slidePrev();
  }

  // Fonction pour les boutons gauche/droite pour les Shonens
  function setNextShonen() {
    swiperRefShonen.current?.slideNext();
  }
  function setPrevShonen() {
    swiperRefShonen.current?.slidePrev();
  }

  // Fonction pour les boutons gauche/droite pour les Seinen
  function setNextSeinen() {
    swiperRefSeinen.current?.slideNext();
  }
  function setPrevSeinen() {
    swiperRefSeinen.current?.slidePrev();
  }

  // Fonction pour les boutons gauche/droite pour les Shojo
  function setNextShojo() {
    swiperRefShojo.current?.slideNext();
  }
  function setPrevShojo() {
    swiperRefShojo.current?.slidePrev();
  }

  return (
    <>
      <section className="mx-10 xl:mx-50 lg:mx-20">
        {/* ****************** Caroussel Populaire ****************** */}
        <div className="relative mt-10 md:mt-15">
          <h2 className="text-white text-xl mb-3">Populaire</h2>
          <div className="relative">
            {/* Bouton gauche */}
            <RxChevronLeft
              onClick={setPrevPopulaire}
              className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
            />

            {/* Bouton droit */}
            <RxChevronRight
              onClick={setNextPopulaire}
              className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
            />
            <Swiper
              onSwiper={(swiper) => {
                swiperRefPopulaire.current = swiper;
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

        {/* ****************** Caroussel Shonen ****************** */}
        <div className="relative mt-10 md:mt-15">
          <h2 className="text-white text-xl mb-3">Shonen</h2>
          <div className="relative">
            {/* Bouton gauche */}
            <RxChevronLeft
              onClick={setPrevShonen}
              className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
            />

            {/* Bouton droit */}
            <RxChevronRight
              onClick={setNextShonen}
              className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
            />
            <Swiper
              onSwiper={(swiper) => {
                swiperRefShonen.current = swiper;
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

        {/* ****************** Caroussel Seinen ****************** */}
        <div className="relative mt-10 md:mt-15">
          <h2 className="text-white text-xl mb-3">Seinen</h2>
          <div className="relative">
            {/* Bouton gauche */}
            <RxChevronLeft
              onClick={setPrevSeinen}
              className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
            />

            {/* Bouton droit */}
            <RxChevronRight
              onClick={setNextSeinen}
              className="hidden lg:flex absolute -right-12 top-1/2 -translate-y-1/2 bg-[var(--color-secondary)] rounded-full w-6 h-6 z-10 cursor-pointer"
            />
            <Swiper
              onSwiper={(swiper) => {
                swiperRefSeinen.current = swiper;
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

        {/* ****************** Caroussel Shojo ****************** */}
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
      </section>
    </>
  );
}

export default CarouselGenre;

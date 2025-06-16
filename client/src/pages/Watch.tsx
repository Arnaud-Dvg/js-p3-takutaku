import { useEffect, useState } from "react";
import { useAnimeContext } from "../../context/AnimeContext";
import EpisodeList from "../components/watch/EpisodeList";
import SeasonList from "../components/watch/SeasonList";

type Season = {
  id: number;
  number: number;
  anime_id: number;
};

function Watch() {
  const [seasonSelected, setSeasonSelected] = useState<Season | null>(null);
  const { setAnimeSelected } = useAnimeContext();

  // Récupération de l'ensemble des données de l'animé sélectionné depuis le localStorage
  useEffect(() => {
    const animeData = localStorage.getItem("animeSelected");
    if (animeData) {
      const anime = JSON.parse(animeData);
      setAnimeSelected(anime);
    }
  }, [setAnimeSelected]);

  return (
    <>
      <SeasonList onSeasonSelect={setSeasonSelected} />
      <EpisodeList seasonSelected={seasonSelected} />
    </>
  );
}

export default Watch;

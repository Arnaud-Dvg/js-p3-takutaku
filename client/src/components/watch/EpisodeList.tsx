import { useEffect, useState } from "react";
import { useAnimeContext } from "../../../context/AnimeContext";

type Episode = {
  id: number;
  number: number;
  title: string;
  synopsis: string;
  season_id: number;
};

type Season = {
  id: number;
  number: number;
  anime_id: number;
};

type EpisodeListProps = {
  seasonSelected: Season | null;
};

function EpisodeList({ seasonSelected }: EpisodeListProps) {
  const { animeSelected } = useAnimeContext(); // Récupère l'anime sélectionné
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const filteredEpisodes = episodes.filter(
    (episode) => episode.season_id === seasonSelected?.id,
  ); // Filtre les épisodes pour la saison sélectionnée

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/episode`,
        );
        const data = await response.json();
        setEpisodes(data);
      } catch (err) {
        console.error("Erreur lors du fetch :", err);
      }
    };
    fetchEpisodes();
  }, []); // Récupère les épisodes depuis l'API

  return (
    <section>
      <ul className="flex flex-col gap-4 p-4 md:flex-row md:flex-wrap">
        {filteredEpisodes.map((episode) => (
          <li key={episode.id} className="flex md:flex-col md:w-[200px] gap-2">
            <img
              src={animeSelected?.paysage}
              alt={animeSelected?.title}
              className="mb-2 w-[200px]"
            />
            <span className="text-tertiary">
              S{seasonSelected?.number}E{episode.number} - {episode.title}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EpisodeList;

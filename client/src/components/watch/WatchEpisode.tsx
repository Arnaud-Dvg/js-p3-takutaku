import { useEffect, useRef, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { useAnimeContext } from "../../../context/AnimeContext";

type Episode = {
  id: number;
  number: number;
  title: string;
  synopsis: string;
  season_id: number;
};

type WatchEpisodeProps = {
  episodeSelected: Episode | null;
};

function WatchEpisode({ episodeSelected }: WatchEpisodeProps) {
  const { animeSelected } = useAnimeContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleWatchAnime = () => {
    setIsVideoPlaying(true);
    videoRef.current?.play();
  };

  // Biome ne veut pas "episodeSelected" dans le tableau de dépendance
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsVideoPlaying(false);
    videoRef.current?.load(); // Recharge la vidéo à chaque changement d'épisode
  }, [episodeSelected]);

  return (
    <section>
      <div className="relative flex items-center justify-center">
        <img
          src={animeSelected?.paysage}
          alt={animeSelected?.title}
          className={isVideoPlaying ? "hidden" : "block"}
        />
        <button
          type="button"
          onClick={() => handleWatchAnime()}
          className="text-secondary"
        >
          <BsPlayCircleFill
            className={
              isVideoPlaying
                ? "hidden"
                : "block absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl lg:text-8xl bg-tertiary/70 rounded-full"
            }
          />
        </button>
      </div>
      <div className="flex items-center justify-center">
        {/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
        <video
          ref={videoRef}
          width="400"
          controls
          className={!isVideoPlaying ? "hidden" : "block w-full"}
        >
          <source src={animeSelected?.video} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

export default WatchEpisode;

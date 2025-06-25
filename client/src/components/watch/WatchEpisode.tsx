import { useEffect, useRef, useState } from "react";
import { BsPlayCircleFill } from "react-icons/bs";
import { useAnimeContext } from "../../../context/AnimeContext";
import { useUserContext } from "../../../context/UserContext";

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
  const { user, loading } = useUserContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  //biome ne veut pas de espidode selected dans le tableau de dépendance
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsVideoPlaying(false);
    videoRef.current?.load();
  }, [episodeSelected]);

  useEffect(() => {
    if (!loading && !user) {
      // Je vérifie ici que le chargement des données utilisateurs est terminé et que les informations aient été chargées (voir useEffect du UserContext)
      console.warn("⚠️ Utilisateur non connecté"); // Si on a pas réussit à charger les informations alors on met une alerte
    }
  }, [loading, user]); //On relance que quand l'un des deux change

  const handleWatchAnime = async () => {
    if (loading) {
      // Loading est un boolean je vérifie donc s'il est true
      console.log("⏳ Données utilisateur en cours de chargement..."); // s'il est true (que les données du localStorage ne sont pas encore chargées) j'affiche ce message et j'arrête la fonction
      return;
    }

    if (!user?.id || !animeSelected?.id) {
      // Ici je vérifie qu'un animé est bien choisit pour être visionné et qu'un utilisateur est bien connecté
      console.warn("❗ userId ou animeId manquant");
      return; //  Si l’un des deux manque, ça ne sert à rien d’envoyer la requête → on quitte la fonction (return) et on log un avertissement.
    }

    try {
      const response = await fetch("http://localhost:3310/api/add_to_history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          animeId: animeSelected.id,
        }),
      }); // Ici j'envoie une requête POST qui ajoute une ligne dans la table de jointure Users_Anime qui contient dans le body de la requête l'ID de l'utilisateur connecté ainsi que l'ID de l'animé qu'il souhaite regarder

      if (!response.ok) {
        throw new Error("Échec de l'ajout à l'historique");
      }

      setIsVideoPlaying(true);
      videoRef.current?.play(); // je lance la lecture de la vidéo
      console.log("📺 Visionnage lancé et historique mis à jour !");
    } catch (error) {
      console.error("❌ Erreur lors du visionnage :", error);
    }
  };

  return (
    <section>
      <div className="relative flex items-center justify-center">
        <img
          src={animeSelected?.paysage}
          alt={animeSelected?.title}
          className={isVideoPlaying ? "hidden" : "block"}
        />
        {!isVideoPlaying && (
          <button
            type="button"
            onClick={handleWatchAnime}
            className="text-secondary"
          >
            <BsPlayCircleFill className="block absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl lg:text-8xl bg-tertiary/70 rounded-full" />
          </button>
        )}
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

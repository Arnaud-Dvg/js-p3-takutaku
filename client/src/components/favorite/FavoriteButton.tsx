import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserContext } from "../../../context/UserContext";

function FavoriteButton({
  animeId,
  onUnfavorite, // callback pour notifier le parent si l'utilisateur retire le favori
}: {
  animeId: number;
  onUnfavorite?: () => void;
}) {
  const { user } = useUserContext();
  const { connected } = useAuthContext(); // Récupère l'utilisateur connecté et son état de connexion, indispensable pour vérifier si l'utilisateur peut ajouter un favori
  const [isFavorite, setIsFavorite] = useState(false); // État local pour savoir si l'anime est un favori
  const [relationExists, setRelationExists] = useState(false); // État local pour savoir si la relation entre l'utilisateur et l'anime existe déjà

  useEffect(() => {
    const fetchRelation = async () => {
      if (!connected || !user) return;
      // Vérifie si l'utilisateur est connecté et a un ID
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users_anime/${user.id}/${animeId}`,
        );
        // Récupère la relation entre l'utilisateur et l'anime
        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.is_favorite);
          setRelationExists(true); // Si la ligne existe, tu stockes l'état is_favorite et tu notes que la relation existe
        } else {
          setIsFavorite(false);
          setRelationExists(false); // Aucune relation trouvée, on va donc devoir faire un POST pour créer la relation
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la relation :", error);
      }
    };
    fetchRelation();
  }, [connected, user, animeId]);

  // Gere le click sur le bouton favori
  const handleFavoriteToggle = async () => {
    if (!connected || !user) return; // Securité l'utilisateur doit être connecté pour pouvoir ajouter un favori
    try {
      if (!relationExists) {
        // Crée la relation avec is_favorite = true
        console.log("Sending:", {
          users_id: user.id,
          anime_id: animeId,
          is_favorite: true,
        });

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users_anime`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`, // Envoie le token de l'utilisateur pour authentification
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              users_id: user.id,
              anime_id: animeId,
              is_favorite: true,
            }), // Envoie dans le body les infos de la relation, c'est ce qui va crée la ligne dans la table users_anime
          },
        );

        if (!response.ok) throw new Error("Erreur création favori");

        setIsFavorite(true);
        setRelationExists(true); // MAJ localement pour que l'icone change immédiatement
      } else {
        // Modifie is_favorite
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users_anime/${user.id}/${animeId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              is_favorite: !isFavorite,
            }),
          },
        ); // Tu modifies la ligne avec le nouvel etat de is_favorite

        if (!response.ok) throw new Error("Erreur modification favori");

        setIsFavorite((prev) => {
          const updated = !prev;
          if (!updated && onUnfavorite) {
            onUnfavorite(); // Si l'utilisateur retire le favori, appel callback
          }
          return updated;
        });
      }
    } catch (error) {
      console.error("Erreur lors du toggle favori :", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavoriteToggle}
      className="bg-black bg-opacity-60 p-1 rounded-full text-secondary hover:text-secondary transition"
      title="Ajouter aux favoris"
    >
      {isFavorite ? (
        <FaHeart className="text-base" />
      ) : (
        <FaRegHeart className="text-base" />
      )}
    </button>
  );
}

export default FavoriteButton;

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

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchRelation = async () => {
      try {
        if (!user) return;
        // Vérifie si l'utilisateur est connecté et a un ID
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite_anime/${user.id}`,
        );
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          const found = data.find((fav) => fav.anime_id === animeId);
          if (found) {
            setIsFavorite(true);
            setRelationExists(true);
          } else {
            setIsFavorite(false);
            setRelationExists(false);
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la relation :", error);
      }
    };
    fetchRelation();
  }, [connected, user]);

  // Gere le click sur le bouton favori
  const handleFavoriteToggle = async () => {
    if (!connected || !user) return; // Securité l'utilisateur doit être connecté pour pouvoir ajouter un favori
    try {
      if (!relationExists) {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite_anime`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${user.token}`, // Envoie le token de l'utilisateur pour authentification
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              users_id: user.id,
              anime_id: animeId,
            }), // Envoie dans le body les infos de la relation, c'est ce qui va crée la ligne dans la table _anime
          },
        );

        if (!response.ok) throw new Error("Erreur création favori");

        setIsFavorite(true);
        setRelationExists(true); // MAJ localement pour que l'icone change immédiatement
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorite_anime/${user.id}/${animeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`, // Envoie le token de l'utilisateur pour authentification
            },
          },
        );

        if (!response.ok) throw new Error("Erreur suppression favori");

        setIsFavorite(false);
        setRelationExists(false); // MAJ localement pour que l'icone change immédiatement
        if (onUnfavorite) onUnfavorite(); // Notifie le parent si un callback est fourni
      }
    } catch (error) {
      console.error("Erreur lors du toggle favori :", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleFavoriteToggle}
      className="bg-primary bg-opacity-60 p-1 rounded-full text-secondary hover:text-secondary transition cursor-pointer"
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

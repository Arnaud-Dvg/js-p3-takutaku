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
  const { connected } = useAuthContext(); // Récupère l'utilisateur connecté et son état de connexion
  const [isFavorite, setIsFavorite] = useState(false); // État local pour savoir si l'anime est un favori

  // Récupère l'état initial du favori lors du montage du composant
  useEffect(() => {
    const fetchFavorite = async () => {
      if (!connected || !user) return; // S'assure que l'utilisateur est bien connecté

      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users_anime/${user.id}/${animeId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Authentification par token
              "Content-Type": "application/json",
            },
          },
        );

        if (!res.ok) throw new Error(`Erreur: ${res.status}`);

        const data = await res.json();
        setIsFavorite(data.is_favorite); // Met à jour l'état local en fonction de la base
      } catch (err) {
        console.error(
          "Erreur lors du chargement de la relation favorite :",
          err,
        );
        setIsFavorite(false); // En cas d'erreur, on part du principe que ce n'est pas un favori
      }
    };

    fetchFavorite();
  }, [connected, user, animeId]);

  // Gère le clic sur l'icône de favori
  const handleToggle = async () => {
    if (!connected || !user) return; // Vérifie que l'utilisateur est connecté

    const newValue = !isFavorite; // Valeur à appliquer après le clic

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users_anime/${user.id}/${animeId}`,
        {
          method: "PUT", // Le backend gère maintenant création ET modification via PUT (upsert)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_favorite: newValue }), // Nouvelle valeur de is_favorite
        },
      );

      if (!res.ok) throw new Error("Erreur lors de la mise à jour du favori");

      setIsFavorite(newValue); // Met à jour immédiatement l'UI

      if (!newValue && onUnfavorite) {
        // Si on a retiré le favori, on déclenche un callback vers le parent
        // setTimeout évite une erreur de mise à jour pendant le render
        setTimeout(() => onUnfavorite(), 0);
      }
    } catch (err) {
      console.error("Erreur lors du toggle du favori :", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="bg-black bg-opacity-60 p-1 rounded-full text-secondary hover:text-secondary transition"
      title="Ajouter aux favoris"
    >
      {isFavorite ? (
        <FaHeart className="text-base text-secondary" />
      ) : (
        <FaRegHeart className="text-base text-secondary" />
      )}
    </button>
  );
}

export default FavoriteButton;

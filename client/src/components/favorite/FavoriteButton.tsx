import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "../../../context/AuthContext";
import { useFavoriteContext } from "../../../context/FavoriteContext";

function FavoriteButton({ animeId }: { animeId: number }) {
  const { connected } = useAuthContext();
  const { isFavorite, toggleFavorite } = useFavoriteContext();

  const handleClick = async () => {
    if (!connected || !animeId) return;
    await toggleFavorite(animeId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-primary bg-opacity-60 p-1 rounded-full text-secondary hover:text-secondary transition cursor-pointer"
      title="Ajouter aux favoris"
    >
      {isFavorite(animeId) ? (
        <FaHeart className="text-base" />
      ) : (
        <FaRegHeart className="text-base" />
      )}
    </button>
  );
}

export default FavoriteButton;

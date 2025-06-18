import { useAnimeContext } from "../../context/AnimeContext";
import WatchButton from "../components/home/WatchButton";

function Anime() {
  const { animeSelected } = useAnimeContext();

  console.log("animeSelected :", animeSelected);
  if (!animeSelected) {
    return (
      <div className="text-tertiary text-center mt-10">
        <p>Aucun anime sélectionné.</p>
      </div>
    );
  }

  return (
    <section className="text-tertiary mt-10">
      <div className="flex flex-col justify-center items-center gap-2">
        <img
          src={animeSelected.paysage}
          alt={animeSelected.title}
          className="w-full object-cover"
        />
        <h1 className="text-2xl mt-4 uppercase text-center mx-8 ">
          {animeSelected.title}
        </h1>
        <p className="text-sm">
          Date de sortie :{" "}
          {new Date(animeSelected.date).toLocaleDateString("fr-FR")}
        </p>{" "}
        {/*Formatage de la date*/}
      </div>

      <ul className="flex mx-8 my-5 gap-5 justify-center text-lgitems-center">
        {animeSelected.types?.map((type) => (
          <li key={type.id} className="border-1 rounded-full px-2 py-1">
            {type.name}
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-start mx-8 my-5 text-sm">
        <p className="mb-4">{animeSelected.synopsis}</p>

        <WatchButton anime={animeSelected} />
      </div>
    </section>
  );
}

export default Anime;

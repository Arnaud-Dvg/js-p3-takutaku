import { useAnimeContext } from "../../../../client/context/AnimeContext";

function Carousel() {
  const { anime } = useAnimeContext();

  console.log("données:", anime);

  if (anime.length === 0) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <>
      {anime.map((anime) => (
        <div key={anime.id}>
          <img src={anime.portrait} alt={anime.title} />
          <h1>{anime.title}</h1>
          <p>{anime.synopsis}</p>
        </div>
      ))}
    </>
  );
}

export default Carousel;

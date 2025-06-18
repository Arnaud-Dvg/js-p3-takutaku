import { createContext, useContext, useEffect, useState } from "react";

// Typage des données du contexte
export type Anime = {
  id: number;
  title: string;
  synopsis: string;
  portrait: string;
  date: string;
  is_published: boolean;
  genre_id: number;
  users_created: number;
  paysage: string;
  video: string;
  types?: { id: number; name: string }[]; // Récupération des types associés
};

// Typage de ce que l'on veut que le contexte réalise
type AnimeContextType = {
  anime: Anime[];
  animeSelected: Anime | null;
  setAnimeSelected: (anime: Anime | null) => void;
  fetchAnime: () => Promise<void>;
  getAnimebyId: (id: number) => Promise<Anime | null>;
  createAnime: (anime: Omit<Anime, "id">) => Promise<number>;
  updateAnime: (id: number, data: Partial<Anime>) => Promise<void>;
  deleteAnime: (id: number) => Promise<void>;
};

const AnimeContext = createContext<AnimeContextType | undefined>(undefined);

export const AnimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [anime, setAnime] = useState<Anime[]>([]);
  const [animeSelected, setAnimeSelected] = useState<Anime | null>(() => {
    // Récupération de l'anime sélectionné depuis le localStorage
    // Si l'anime est déjà stocké, on le parse et on le retourne, sinon on retourne null
    const storedAnime = localStorage.getItem("animeSelected");
    return storedAnime ? JSON.parse(storedAnime) : null;
  });

  useEffect(() => {
    fetchAnime();
  }, []);

  // Stockage de l'anime sélectionné dans le localStorage
  useEffect(() => {
    if (animeSelected) {
      localStorage.setItem("animeSelected", JSON.stringify(animeSelected));
    } else {
      localStorage.removeItem("animeSelected");
    }
  }, [animeSelected]);

  const fetchAnime = (): Promise<void> => {
    return fetch("http://localhost:3310/api/anime")
      .then((res) => res.json())
      .then((data) => {
        setAnime(data);
      });
  };

  const getAnimebyId = (id: number): Promise<Anime | null> => {
    return fetch(`http://localhost:3310/api/anime/${id}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => data || null);
  };

  const createAnime = (newAnime: Omit<Anime, "id">): Promise<number> => {
    return fetch("http://localhost:3310/api/anime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAnime),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchAnime();
        return data.insertId;
      });
  };

  const updateAnime = (
    id: number,
    updateData: Partial<Anime>,
  ): Promise<void> => {
    return fetch(`http://localhost:3310/api/anime/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }).then(() => fetchAnime());
  };

  const deleteAnime = (id: number): Promise<void> => {
    return fetch(`http://localhost:3310/api/anime/${id}`, {
      method: "DELETE",
    }).then(() => fetchAnime());
  };

  return (
    <AnimeContext.Provider
      value={{
        anime,
        animeSelected,
        setAnimeSelected,
        fetchAnime,
        getAnimebyId,
        createAnime,
        updateAnime,
        deleteAnime,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

// Création du hook personnalisé
export const useAnimeContext = () => {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error("useAnimeContext doit être utilisé dans un AnimeProvider");
  }
  return context;
};

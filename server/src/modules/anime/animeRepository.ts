import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Anime = {
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
  types?: { id: number; nom: string }[]; // récupération des types associés
};

class AnimeRepository {
  // Le C du CRUD - Create
  async create(anime: Omit<Anime, "id">) {
    // Création d'un nouvel animé
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO Anime (title, synopsis, portrait, date, is_published, genre_id, users_created, paysage, video) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        anime.title,
        anime.synopsis,
        anime.portrait,
        anime.date,
        anime.is_published,
        anime.users_created,
        anime.paysage,
        anime.video,
      ],
    );
    //Retourne l'ID du nouvel animé inséré
    return result.insertId;
  }

  // Le R du CRUD - Read
  async read(id: number) {
    // Récupère l'animé
    const [animeRows] = await databaseClient.query<Rows>(
      "SELECT * FROM Anime WHERE id = ?",
      [id],
    );
    // Vérifie si l'animé existe
    const anime = animeRows[0] as Anime;

    // Récupère les types associés
    const [typeRows] = await databaseClient.query<Rows>(
      "SELECT type.id, type.name FROM type JOIN anime_type ON type.id = anime_type.type_id WHERE anime_type.anime_id = ?",
      [id],
    );

    // Ajoute les types à l'objet animé
    return { ...anime, types: typeRows };
  }

  async readAll() {
    // Exécute la requête SQL pour lire tout le tableau de la table "Anime"
    const [rows] = await databaseClient.query<Rows>("select * from Anime");

    // Return the array of items
    return rows as Anime[];
  }

  // Le U du CRUD - Update
  async update(anime: Anime) {
    // Exécute la requête SQL pour lire tout le tableau de la table "Anime"
    const [result] = await databaseClient.query<Result>(
      "UPDATE Anime set title = ? WHERE id = ?",
      [anime.title, anime.id],
    );

    // Retourne le tableau d'animés mis à jour

    return result.affectedRows;
  }
  // Le D du CRUD - Delete
  async delete(id: number) {
    // Exécute la requête SQL pour supprimer un anime spécifique par son ID
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM Anime WHERE id = ?",
      [id],
    );
    // Retourne le nombre de lignes affectées par la suppression
    return result.affectedRows;
  }
}

export default new AnimeRepository();

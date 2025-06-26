import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Favorite = {
  users_id: number;
  anime_id: number;
  is_favorite: boolean;
};

class usersAnimeRepository {
  // Le C du CRUD - Create
  async create(favorite: Favorite) {
    // Création d'un nouveau favori
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO users_anime (users_id, anime_id, is_favorite) VALUES (?, ?, ?)",
      [favorite.users_id, favorite.anime_id, favorite.is_favorite],
    );
    // Retourne l'ID de la nouvelle saison insérée
    return result.insertId;
  }

  // Le R du CRUD - Read
  async read(users_id: number, anime_id: number) {
    // Exécute la requête SQL pour lire un favori spécifique par l'ID
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM users_anime WHERE users_id = ? AND anime_id = ?",
      [users_id, anime_id],
    );
    // Retourne la première ligne du résultat de la requête
    return rows[0] as Favorite;
  }

  async readAll(users_id: number) {
    // Exécute la requête SQL pour lire tous les favoris
    const [rows] = await databaseClient.query(
      `SELECT ua.anime_id, ua.is_favorite, a.title, a.portrait
     FROM users_anime ua
     JOIN Anime a ON ua.anime_id = a.id
     WHERE ua.users_id = ?`,
      [users_id],
    );
    return rows as Favorite[];
  }

  // Le U du CRUD - Update
  async update(favorite: Favorite) {
    // Exécute la requête SQL pour mettre à jour un favori existant
    const [result] = await databaseClient.query<Result>(
      "UPDATE users_anime SET is_favorite = ? WHERE users_id = ? AND anime_id = ?",
      [favorite.is_favorite, favorite.users_id, favorite.anime_id],
    );
    return result.affectedRows > 0; // Retourne true si la mise à jour a réussi
  }

  // Le D du CRUD - Delete
  async delete(users_id: number, anime_id: number) {
    // Exécute la requête SQL pour supprimer un favori par son ID
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM users_anime WHERE users_id = ? AND anime_id = ?",
      [users_id, anime_id],
    );
    return result.affectedRows > 0; // Retourne true si la suppression a réussi
  }
}

export default new usersAnimeRepository();

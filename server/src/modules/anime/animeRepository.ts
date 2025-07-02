import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Anime = {
  id: number;
  title: string;
  synopsis: string;
  portrait: string;
  date: number;
  is_published: boolean;
  genre_id: number;
  users_created: number;
  paysage: string;
  video: string;
  types?: { id: number; name: string }[];
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
        anime.genre_id,
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

    // Récupère le genre via genre_id
    const [genreRows] = await databaseClient.query<Rows>(
      "SELECT id, name FROM genre WHERE id = ?",
      [anime.genre_id],
    );

    // Retourne l'objet complet
    return { ...anime, types: typeRows, genre: genreRows[0] };
  }

  async readAll() {
    // Exécute la requête SQL pour lire tout le tableau de la table "Anime"
    const [rows] = await databaseClient.query<Rows>("select * from Anime");

    // Return the array of items
    return rows as Anime[];
  }

  async readAllType(genre: string, type: string) {
    const where = [];
    const values = [];

    console.log("📥 Paramètres reçus :", { genre, type });

    if (genre === "all") {
      where.push("a.genre_id IN (?, ?, ?)");
      values.push(1, 2, 3);
    } else {
      console.log("🔢 Type genre :", typeof genre, genre);
      where.push("a.genre_id = ?");
      values.push(Number(genre));
    }

    if (type !== "all") {
      console.log("🔢 Type type :", typeof type, type);
      where.push("t.id = ?");
      values.push(Number(type));
    }

    const whereSQL = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    console.log("📄 SQL WHERE :", whereSQL);
    console.log("📦 Values SQL :", values);

    const query = `
    SELECT 
      a.id, a.title, a.synopsis, a.genre_id, a.portrait, 
      GROUP_CONCAT(t.id) as tid 
    FROM Anime a 
    INNER JOIN Anime_type at ON a.id = at.anime_id 
    INNER JOIN Type t ON at.type_id = t.id 
    ${whereSQL}
    GROUP BY a.id, a.title, a.synopsis, a.genre_id, a.portrait
  `;

    const [rows] = await databaseClient.query<Rows>(query, values);
    console.log("✅ Résultats trouvés :", rows.length);

    return rows as Anime[];
  }

  // Le U du CRUD - Update
  async update(anime: Anime) {
    // Exécute la requête SQL pour lire tout le tableau de la table "Anime"
    const [result] = await databaseClient.query<Result>(
      "UPDATE Anime set title = ?, synopsis = ?, portrait = ?, date = ?, is_published = ?, genre_id = ?, users_created = ?, paysage = ?, video = ? WHERE id = ?",
      [
        anime.title,
        anime.synopsis,
        anime.portrait,
        anime.date,
        anime.is_published,
        anime.genre_id,
        anime.users_created,
        anime.paysage,
        anime.video,
        anime.id,
      ],
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

  // Lire TOUS les animés avec le genre en plus
  async readAllWithGenre() {
    const [rows] = await databaseClient.query(
      `SELECT a.id, a.title, a.synopsis, a.portrait, a.date, a.is_published, a.paysage, a.video, g.name AS genre_name
      FROM Anime As a
      LEFT JOIN Genre AS g ON a.genre_id = g.id`,
    );
    return rows;
  }
}

export default new AnimeRepository();

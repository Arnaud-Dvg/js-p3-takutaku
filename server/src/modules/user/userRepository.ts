import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password?: string;
  is_admin: boolean;
  is_actif: boolean;
  abonnement_id: number;
};

class userRepository {
  // Le C du CRUD - CREATE
  async create(user: Omit<User, "id">) {
    try {
      // Création d'un nouveau user dans la base de données
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO Users (firstname, lastname, mail, password, is_admin, is_actif, abonnement_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          user.firstname,
          user.lastname,
          user.mail,
          user.password,
          user.is_admin,
          user.is_actif,
          user.abonnement_id,
        ],
      );
      // Retourne l'ID du nouveau user inséré
      console.log("Utilisateur inséré avec ID :", result.insertId);
      return result.insertId;
    } catch (error) {
      console.error("Erreur d'insertion dans la base :", error);
      throw error; // si la requête échoue, on relance l'erreur
    }
  }

  // Le R du CRUD
  async read(id: number) {
    //Exécute la requête SQL pour lire une information par son id
    const [rows] = await databaseClient.query<Rows>(
      "select * from Users where id = ?",
      [id],
    );
    //Retourne la première ligne du résultat de la requête
    return rows[0] as User;
  }
  async readAll() {
    // Exécute la requête SQL pour lire tout le tableau de la table "Users"
    const [rows] = await databaseClient.query<Rows>("select * from Users");
    // Retournes le tableau d'éléments
    return rows as User[];
  }

  //   Le U du CRUD - Update
  async update(user: User) {
    // Exécute la requête SQL pour lire tout le tableau de la table "User"
    const [result] = await databaseClient.query<Result>(
      "UPDATE Users set firstname = ?, lastname = ?, mail = ?, is_admin = ?, is_actif = ?, abonnement_id = ? WHERE id = ?",
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.is_admin,
        user.is_actif,
        user.abonnement_id,
        user.id,
      ],
    );
    // Retourne le tableau des users mis à jour
    return result.affectedRows;
  }
  // Le D du CRUD
  async delete(id: number) {
    // Exécute la requête SQL pour supprimer un user spécifique par son ID
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM Users WHERE id= ?",
      [id],
    );
    // Retourne le nombre de lignes affectées par la suppression

    return result.affectedRows;
  }

  // Lire TOUS les users avec le type d'abonnement en plus

  async readAllWithAbonnement() {
    const [rows] = await databaseClient.query(
      `SELECT u.id, u.firstname, u.lastname, u.mail, u.is_admin, u.is_actif,
            a.name AS abonnement_name
      FROM Users u
      LEFT JOIN Abonnement a ON u.abonnement_id = a.id`,
    );
    return rows;
  }
  // Lire le prénom et le nom de chaque User et afficher toutes les infos des animés qu'il a visualisé
  async readAllWithUsers() {
    const [rows] = await databaseClient.query(`
    SELECT 
      u.id AS user_id,
      u.firstname,
      u.lastname,
      a.id AS anime_id,
      a.title,
      a.portrait
    FROM users AS u
    INNER JOIN users_anime AS ua ON u.id = ua.users_id
    INNER JOIN anime AS a ON a.id = ua.anime_id
  `);
    return rows;
  }
}

export default new userRepository();

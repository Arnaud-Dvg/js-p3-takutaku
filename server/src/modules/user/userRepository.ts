import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  is_admin: boolean;
  is_actif: boolean;
};

class userRepository {
  // Le C du CRUD - CREATE
  async create(user: Omit<User, "id">) {
    // Création d'un nouveau user
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO Users (firstname, lastname, mail, password, is_admin, is_actif) values (?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.password,
        user.is_admin,
        user.is_actif,
      ],
    );
    // Retourne l'ID du nouveau user inséré
    return result.insertId;
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
      "UPDATE Users set firstname = ?, lastname = ?, mail = ?, password = ?, is_admin = ?, is_actif = ? WHERE id = ?",
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.password,
        user.is_admin,
        user.is_actif,
        user.id,
      ],
    );
    // Retourne le tableau d'animés mis à jour
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
}

export default new userRepository();

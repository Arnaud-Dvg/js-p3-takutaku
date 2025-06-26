import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Auth = {
  id: number;
  firstname: string;
  lastname: string;
  mail: string;
  password: string;
  abonnement_id: number;
};

class authRepository {
  async create(user: Omit<Auth, "id">) {
    // Création d'un nouvel utilisateur
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO Users (firstname, lastname, mail, password, abonnement_id) VALUES (?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.password,
        user.abonnement_id,
      ],
    );
    // Retourne l'ID du nouvel utilisateur inséré
    return result.insertId;
  }

  async read(id: number) {
    // Exécute la requête SQL pour lire un utilisateur par son id
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM Users WHERE id = ?",
      [id],
    );
    // Retourne la première ligne du résultat de la requête
    return rows[0] as Auth;
  }

  async readAll() {
    // Exécute la requête SQL pour lire tout le tableau de la table "Users"
    const [rows] = await databaseClient.query<Rows>("select * from Users");
    // Retournes le tableau d'éléments
    return rows as Auth[];
  }

  async signIn(mail: string, password: string) {
    // Exécute la requête SQL pour lire un utilisateur par son mail et mot de passe
    const [rows] = await databaseClient.query<Rows>(
      "select * FROM Users where mail = ? AND password = ?",
      [mail, password],
    );
    //Retourne la première ligne du résultat de la requête ou undefined si aucun utilisateur n'est trouvé
    return rows[0] as Auth | undefined;
  }
}

export default new authRepository();

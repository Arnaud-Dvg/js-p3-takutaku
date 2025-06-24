// Importe et charge automatiquement les variables d'environnement définies dans le fichier `.env`
import "dotenv/config";
import userRepository from "../src/modules/user/userRepository"; // si exporté comme instance

// Importe le module `fs` de Node.js, qui permet d’interagir avec le système de fichiers
import fs from "node:fs";

// Définition d’un groupe de tests nommé "Installation"
describe("Installation", () => {
  // Test unitaire qui vérifie si le fichier `.env` existe bien à l'emplacement prévu
  test("You have created /server/.env", async () => {
    // Vérifie que le fichier `.env` existe dans le dossier parent de celui du test (__dirname/../.env)
    // __dirname = répertoire du fichier actuel
    // ../.env = le fichier `.env` à la racine du dossier /server
    expect(fs.existsSync(`${__dirname}/../.env`)).toBe(true);
    // Si le fichier existe, le test passe. Sinon, il échoue.
  });
});

// Test pour vérifier si le ficher App.tsx existe bien
describe("Installation", () => {
  test("You have created /client/src/App.tsx", async () => {
    expect(fs.existsSync(`${__dirname}/../../client/src/App.tsx`)).toBe(true);
  });
});

// Test unitaire de la méthode "create" du userRepository
test("create retourne l'ID inséré (number)", async () => {
  // Données fictives représentant un nouvel utilisateur à insérer dans la base
  const fakeUser = {
    firstname: "Test", // Prénom
    lastname: "User", // Nom
    mail: "test.user@example.com", // Email unique (pour éviter les conflits)
    password: "securepass", // Mot de passe fictif
    is_admin: false, // Pas admin
    is_actif: true, // Compte actif
    abonnement_id: 1, // ID de l'abonnement (doit exister en base)
  };

  // Appelle la méthode create() pour insérer l'utilisateur dans la base
  const result = await userRepository.create(fakeUser);

  // Vérifie que le résultat retourné est bien un type "number"
  expect(typeof result).toBe("number");

  // Vérifie que l'ID retourné est strictement positif (donc insertion réussie)
  expect(result).toBeGreaterThan(0);
});

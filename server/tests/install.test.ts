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
  const fakeUser = {
    firstname: "Test",
    lastname: "User",
    mail: `delete.test.${Date.now()}@example.com`, // ← unique à chaque exécution
    password: "securepass",
    is_admin: false,
    is_actif: true,
    abonnement_id: 1,
    profil_picture_id: 1,
  };

  // Appelle la méthode create() pour insérer l'utilisateur dans la base
  const result = await userRepository.create(fakeUser);

  // Vérifie que le résultat retourné est bien un type "number"
  expect(typeof result).toBe("number");

  // Vérifie que l'ID retourné est strictement positif (donc insertion réussie)
  expect(result).toBeGreaterThan(0);
});

// Test unitaire de la méthode "delete" du userRepo
// et vérification si le user existe toujours ou pas
test("Test delete", async () => {
  // Création d'un faux user pour pouvoir faire le test du delete (c'est du copier/coller du test Create)
  const fakeUser = {
    firstname: "Test",
    lastname: "User",
    mail: `delete.test.${Date.now()}@example.com`, // ← unique à chaque exécution
    password: "securepass",
    is_admin: false,
    is_actif: true,
    abonnement_id: 1,
    profil_picture_id: 1,
  };

  const createId = await userRepository.create(fakeUser);

  expect(typeof createId).toBe("number");

  expect(createId).toBeGreaterThan(0);

  // Deuxième partie du test, supression du user

  const deleteUser = await userRepository.delete(createId);
  // Vérifie qu'au moins un enregistrement a été supprimé (le retour est souvent un count ou booléen)
  expect(deleteUser).toBeGreaterThan(0);

  const user = await userRepository.findById(createId);
  // Vérifie que l'utilisateur supprimé n'existe plus dans la base
  expect(user).toBeNull();
});

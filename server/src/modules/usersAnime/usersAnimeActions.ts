import type { RequestHandler } from "express";

// Accès à la base de données
import usersAnimeRepository from "./usersAnimeRepository";

interface Favorite {
  users_id: number;
  anime_id: number;
  is_favorite: boolean;
}

// Le B du BREAD - Logique pour parcourir tous les favoris d'un utilisateur
const browse: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const favoris = await usersAnimeRepository.readAll(userId);
    res.json(favoris);
  } catch (error) {
    next(error);
  }
};

// Le R du BREAD - Logique pour lire un favori spécifique
const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const animeId = Number(req.params.animeId);
    const favori = await usersAnimeRepository.read(userId, animeId);
    if (!favori) {
      res.status(200).json({ is_favorite: false });
    } else {
      res.status(200).json(favori);
    }
  } catch (error) {
    next(error);
  }
};

// Le E du BREAD - Logique pour modifier un favori spécifique
const edit: RequestHandler = async (req, res, next) => {
  try {
    const users_id = Number(req.params.userId);
    const anime_id = Number(req.params.animeId);
    const { is_favorite } = req.body;

    // On vérifie si la relation existe déjà
    const existing = await usersAnimeRepository.read(users_id, anime_id);

    if (!existing) {
      // Elle n'existe pas → on la crée (upsert logique)
      await usersAnimeRepository.create({
        users_id,
        anime_id,
        is_favorite,
      });

      res.status(201).json({ created: true });
      return;
    }

    // Sinon, on la met à jour
    const affectedRows = await usersAnimeRepository.update({
      users_id,
      anime_id,
      is_favorite,
    });

    if (!affectedRows) {
      res.sendStatus(500); // en théorie impossible ici
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Le A du BREAD - Logique pour ajouter une nouvelle favori
const add: RequestHandler = async (req, res, next) => {
  try {
    const { users_id, anime_id, is_favorite } = req.body;
    // Vérification des types des champs
    if (
      typeof users_id !== "number" ||
      typeof anime_id !== "number" ||
      typeof is_favorite !== "boolean"
    ) {
      res.status(400).json({ message: "Champs invalides" });
      return;
    }

    const insertId = await usersAnimeRepository.create({
      users_id,
      anime_id,
      is_favorite,
    });

    res.status(201).json({ insertId, users_id, anime_id, is_favorite });
  } catch (error) {
    next(error);
  }
};

// Le D du BREAD - Logique pour supprimer une saison spécifique
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const users_id = Number(req.params.userId);
    const anime_id = Number(req.params.animeId);

    const affectedRows = await usersAnimeRepository.delete(users_id, anime_id);

    if (!affectedRows) res.sendStatus(404);
    else res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, add, edit, destroy };

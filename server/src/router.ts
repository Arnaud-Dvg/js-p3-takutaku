import express from "express";
import security from "./middleware/security";
import { checkToken } from "./middleware/security";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
// Routes for the anime module
import animeAction from "../src/modules/anime/animeAction";

router.get("/api/anime", animeAction.browse);
router.get("/api/anime/:id", animeAction.read);
router.post("/api/anime", animeAction.add);
router.put("/api/anime/:id", animeAction.edit);
router.delete("/api/anime/:id", animeAction.destroy);
router.get("/api/anime_with_genre", animeAction.browseWithGenre);

//Routes for the genre module
import genreAction from "./modules/genre/genreAction";
router.get("/api/genre", genreAction.browse);
router.get("/api/genre/:id", genreAction.read);
router.post("/api/genre", genreAction.add);
router.put("/api/genre/:id", genreAction.edit);
router.delete("/api/genre/:id", genreAction.destroy);

// Routes for the type module
import typeAction from "./modules/type/typeAction";
router.get("/api/type", typeAction.browse);
router.get("/api/type/:id", typeAction.read);
router.post("/api/type", typeAction.add);
router.put("/api/type/:id", typeAction.edit);
router.delete("/api/type/:id", typeAction.destroy);

// Routes for the season module
import seasonAction from "../src/modules/season/seasonAction";
router.get("/api/season", seasonAction.browse);
router.get("/api/season/:id", seasonAction.read);
router.post("/api/season", seasonAction.add);
router.put("/api/season/:id", seasonAction.edit);
router.delete("/api/season/:id", seasonAction.destroy);

// Routes for the episode module
import episodeAction from "../src/modules/episode/episodeAction";
router.get("/api/episode", episodeAction.browse);
router.get("/api/episode/:id", episodeAction.read);
router.post("/api/episode", episodeAction.add);
router.put("/api/episode/:id", episodeAction.edit);
router.delete("/api/episode/:id", episodeAction.destroy);

// Routes for the abonnement module
import abonnementAction from "../src/modules/Abonnement/abonnementAction";
router.get("/api/abonnement", abonnementAction.browse);
router.get("/api/abonnement/:id", abonnementAction.read);
router.post("/api/abonnement", abonnementAction.add);
router.put("/api/abonnement/:id", abonnementAction.edit);
router.delete("/api/abonnement/:id", abonnementAction.destroy);

// Routes for the user module
import userAction from "./modules/user/userAction";

router.get("/api/user", userAction.browse);
router.get("/api/users/:id([0-9]+)", checkToken, userAction.read);
router.post("/api/user", userAction.add);
router.put("/api/user/:id", userAction.edit);
router.delete("/api/user/:id", userAction.destroy);
router.get("/api/user_abonnement", userAction.browse);
router.get("/api/user_with_abonnement", userAction.browseWithAbonnement);
router.get("/api/read_all_with_anime", userAction.readAllWithUsers);
router.post("/api/add_to_history", userAction.addToHistory);
router.get("/api/user/:id/history", userAction.readUserHistory);

//Routes for the authenfication module
import authAction from "./modules/auth/authAction";
router.post("/api/auth/signin", authAction.signIn);
router.post("/api/auth/signup", authAction.signUp);

export default router;

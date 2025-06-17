import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
// Import the anime action module
import animeAction from "../src/modules/anime/animeAction";

router.get("/api/anime", animeAction.browse);
router.get("/api/anime/:id", animeAction.read);
router.post("/api/anime", animeAction.add);
router.put("/api/anime/:id", animeAction.edit);
router.delete("/api/anime/:id", animeAction.destroy);

//Impoty the genre action module
import genreAction from "./modules/genre/genreAction";
router.get("/api/genre", genreAction.browse);
router.get("/api/genre/:id", genreAction.read);
router.post("/api/genre", genreAction.add);
router.put("/api/genre/:id", genreAction.edit);
router.delete("/api/genre/:id", genreAction.destroy);

// Import the type action module
import typeAction from "./modules/type/typeAction";
router.get("/api/type", typeAction.browse);
router.get("/api/type/:id", typeAction.read);
router.post("/api/type", typeAction.add);
router.put("/api/type/:id", typeAction.edit);
router.delete("/api/type/:id", typeAction.destroy);

// Import the season action module
import seasonAction from "../src/modules/season/seasonAction";
router.get("/api/season", seasonAction.browse);
router.get("/api/season/:id", seasonAction.read);
router.post("/api/season", seasonAction.add);
router.put("/api/season/:id", seasonAction.edit);
router.delete("/api/season/:id", seasonAction.destroy);

// Import the episode action module
import episodeAction from "../src/modules/episode/episodeAction";
router.get("/api/episode", episodeAction.browse);
router.get("/api/episode/:id", episodeAction.read);
router.post("/api/episode", episodeAction.add);
router.put("/api/episode/:id", episodeAction.edit);
router.delete("/api/episode/:id", episodeAction.destroy);

// Import the abonnement module
import abonnementAction from "../src/modules/Abonnement/abonnementAction";
router.get("/api/abonnement", abonnementAction.browse);
router.get("/api/abonnement/:id", abonnementAction.read);
router.post("/api/abonnement", abonnementAction.add);
router.put("/api/abonnement/:id", abonnementAction.edit);
router.delete("/api/abonnement/:id", abonnementAction.destroy);

/* ************************************************************************* */
//Routes User//
import userAction from "./modules/user/userAction";

router.get("/api/user", userAction.browse);
router.get("/api/user/:id", userAction.read);
router.post("/api/user", userAction.add);
router.put("api/user/:id", userAction.edit);
router.delete("/api/user/:id", userAction.destroy);

export default router;

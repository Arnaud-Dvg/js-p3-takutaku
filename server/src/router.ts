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

/* ************************************************************************* */

export default router;

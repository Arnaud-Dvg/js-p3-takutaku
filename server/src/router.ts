import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import animeAction from "../src/modules/anime/animeAction";

router.get("/api/anime", animeAction.browse);
router.get("/api/anime/:id", animeAction.read);
router.post("/api/anime", animeAction.add);
router.put("/api/anime/:id", animeAction.edit);
router.delete("/api/anime/:id", animeAction.destroy);

import genreAction from "./modules/genre/genreAction";

router.get("/api/genre", genreAction.browse);
router.get("/api/genre/:id", genreAction.read);
router.post("/api/genre", genreAction.add);
router.put("/api/genre/:id", genreAction.edit);
router.delete("/api/genre/:id", genreAction.destroy);

import typeAction from "./modules/type/typeAction";

router.get("/api/type", typeAction.browse);
router.get("/api/type/:id", typeAction.read);
router.post("/api/type", typeAction.add);
router.put("/api/type/:id", typeAction.edit);
router.delete("/api/type/:id", typeAction.destroy);
/* ************************************************************************* */

export default router;

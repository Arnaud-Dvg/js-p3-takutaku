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

// Define abonnement routes
import abonnementAction from "../src/modules/Abonnement/abonnementAction";
router.get("/api/abonnement", abonnementAction.browse);
router.get("/api/abonnement/:id", abonnementAction.read);
router.post("/api/abonnement", abonnementAction.add);
router.put("/api/abonnement/:id", abonnementAction.edit);
router.delete("/api/abonnement/:id", abonnementAction.destroy);

/* ************************************************************************* */

export default router;

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

/* ************************************************************************* */
//Routes User//
import userAction from "./modules/user/userAction";

router.get("/api/user", userAction.browse);
router.get("/api/user/:id", userAction.read);
router.post("/api/user", userAction.add);
router.put("/api/user/:id", userAction.edit);
router.delete("/api/user/:id", userAction.destroy);
router.get("/api/users_abonnement", userAction.browse);
router.get("/api/users-with-abonnement", userAction.browseWithAbonnement);

export default router;

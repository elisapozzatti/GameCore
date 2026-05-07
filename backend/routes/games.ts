import express from "express";
import GamesSchema from "../models/games.ts";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const games = await GamesSchema.find();
    res.json(games);
  } catch (error) {
    console.error("Errore nel recupero dei videogiochi", error);
    res.status(400);
  }
});

export default router;

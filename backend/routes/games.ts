import express from "express";
import GamesSchema from "../models/games.ts";
import { searchGames } from "../services/searchGames.ts";
import { getTwitchToken } from "../services/twitchToken.ts";

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

//get nome del gioco in base a quello che scrive l'utente nella barra di ricerca
router.get("/search/:query", async (req, res) => {
  try {
    const query = req.params.query as string;

    if (!query || query.trim().length < 2) {
      return res.json([]);
    }

    const token = await getTwitchToken();

    const games = await searchGames(token, query);

    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Errore ricerca giochi",
    });
  }
});

export default router;

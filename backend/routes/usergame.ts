import express from "express";
import mongoose from "mongoose";
import UserGameSchema from "../models/usergame.ts";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usergame = await UserGameSchema.find();
    res.json(usergame);
  } catch (error) {
    console.error("Errore nel recupero dei videogiochi degli utenti", error);
    res.status(400);
  }
});

//videogiochi di un utente
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    res.json(usergame);
  } catch (error) {
    console.error("Errore nel recupero dei videogiochi degll'utente", error);
    res.status(400);
  }
});

export default router;

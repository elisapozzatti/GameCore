import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.ts";
import UsersSchema from "../models/users.ts";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const users = await UsersSchema.find();
    res.json(users);
  } catch (error) {
    console.error("Errore nel recupero degli utenti", error);
    res.status(400);
  }
});

//dati di un utente
router.get("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UsersSchema.findById(userId);
    res.json(user);
  } catch (error) {
    console.error("Errore nel recupero dei dati dell'utente", error);
    res.status(400);
  }
});

export default router;

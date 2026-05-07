import express from "express";
import UsersSchema from "../models/users.ts";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UsersSchema.find();
    res.json(users);
  } catch (error) {
    console.error("Errore nel recupero degli utenti", error);
    res.status(400);
  }
});

export default router;

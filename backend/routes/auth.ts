import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersSchema from "../models/users.ts";

const router = express.Router();

//registrazione
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //controllo utente esistente
    const exists = await UsersSchema.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Utente già esistente",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creazione utente
    const addUser = new UsersSchema({
      username,
      email,
      passwordHash: hashedPassword,
    });

    await addUser.save();

    res.status(201).json({
      message: "Registrazione completata",
    });
  } catch (error) {
    res.status(500).json({
      message: "Errore del server",
      error,
    });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //ricerca utente
    const user = await UsersSchema.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Utente non trovato",
      });
    }

    //verifica password
    const isValid = await bcrypt.compare(password, user.passwordHash as string);

    if (!isValid) {
      return res.status(400).json({
        message: "Password errata",
      });
    }

    //creazione token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({
      message: "Errore del server",
      error,
    });
  }
});

export default router;

import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.ts";
import UserGameSchema from "../models/usergame.ts";
import GamesSchema from "../models/games.ts";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const usergame = await UserGameSchema.find();
    res.json(usergame);
  } catch (error) {
    console.error("Errore nel recupero dei videogiochi degli utenti", error);
    res.status(400);
  }
});

//videogiochi di un utente
router.get("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    res.json(usergame);
  } catch (error) {
    console.error("Errore nel recupero dei videogiochi dell'utente", error);
    res.status(400);
  }
});

//videogioco preferito di un utente
router.get("/prefer/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const prefer = usergame.find((item) => item.isFavorite === true);
    res.json(prefer);
  } catch (error) {
    console.error(
      "Errore nel recupero del videogioco preferito dell'utente",
      error,
    );
    res.status(400);
  }
});

//videogiochi in gioco di un utente
router.get("/play/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const status = usergame.find((item) => item.status === "playing");
    res.json(status);
  } catch (error) {
    console.error(
      "Errore nel recupero dei videogiochi in gioco dell'utente",
      error,
    );
    res.status(400);
  }
});

//videogiochi completati di un utente
router.get("/complete/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const complete = usergame.find((item) => item.status === "completed");
    res.json(complete);
  } catch (error) {
    console.error(
      "Errore nel recupero dei videogiochi completati dell'utente",
      error,
    );
    res.status(400);
  }
});

/*//ore di gioco totali di un utente
router.get("/hours/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    let hours = 0;
    usergame.forEach((g) => {
      if (!g.hoursPlayed) return;
      hours += g.hoursPlayed;
    });

    //dopo il calcolo aggiorno anche il dato in user
    const updateUser = await UsersSchema.findByIdAndUpdate(
      userId,
      { hoursPlayed: hours },
      { returnDocument: "after" },
    );
    //await updateUser?.save();

    res.json(hours);
  } catch (error) {
    console.error(
      "Errore nel recupero delle ore totali giocate dall'utente",
      error,
    );
    res.status(400);
  }
});*/

router.post("/:id", auth, async (req: any, res) => {
  try {
    const id = req.params.id;
    const game = await GamesSchema.findOne({
      _id: id,
    });

    if (!game) {
      return res.status(404).json({
        error: "Gioco non trovato",
      });
    }

    const {
      userId,
      gameId,
      status,
      completionPercentage,
      personalRating,
      inspirationLevel,
      hoursPlayed,
      isFavorite,
      wouldRecommend,
      notes,
    } = req.body;

    const addGame = new UserGameSchema({
      userId: req.user.userId,
      gameId: game._id,
      status,
      completionPercentage,
      personalRating,
      inspirationLevel,
      hoursPlayed,
      isFavorite,
      wouldRecommend,
      notes,
    });
    await addGame.save();
  } catch (error) {
    console.error("Errore nell'aggiunta del gioco", error);
    res.status(400);
  }
});

export default router;

import express from "express";
import mongoose from "mongoose";
import auth from "../middleware/auth.ts";
import UserGameSchema from "../models/usergame.ts";
import GamesSchema from "../models/games.ts";
import UsersSchema from "../models/users.ts";
import UserGame from "../models/usergame.ts";

const router = express.Router();

router.get("/", auth, async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    const usergame = await UserGameSchema.find({ userId: { $ne: userId } })
      .populate("gameId")
      .populate("userId");

    const result = usergame.map((item) => ({
      ...item.toObject(),
      game: item.gameId,
      user: item.userId,
    }));

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//videogiochi di un utente
router.get("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const result = await Promise.all(
      usergame.map(async (item) => {
        const games = await GamesSchema.findById(item.gameId).lean();

        return {
          ...item.toObject(),
          game: games,
        };
      }),
    );

    res.json(result);
  } catch (error) {
    console.error("Errore nel recupero dei videogiochi dell'utente", error);
    res.status(400);
  }
});

//primi 6 videogiochi di un utente
router.get("/top6/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).limit(6);

    const result = await Promise.all(
      usergame.map(async (item) => {
        const games = await GamesSchema.findById(item.gameId).lean();

        return {
          ...item.toObject(),
          game: games,
        };
      }),
    );

    res.json(result);
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
    const game = await GamesSchema.findById(prefer?.gameId);
    res.json({ ...prefer, game });
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

    const play = usergame.filter((item) => item.status === "playing");

    const result = await Promise.all(
      play.map(async (item) => {
        const game = await GamesSchema.findById(item.gameId).lean();

        return {
          ...item.toObject(),
          game,
        };
      }),
    );

    res.json(result);
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

    const complete = usergame.filter((item) => item.status === "completed");

    const result = await Promise.all(
      complete.map(async (item) => {
        const game = await GamesSchema.findById(item.gameId).lean();

        return {
          ...item.toObject(),
          game,
        };
      }),
    );

    res.json(result);
  } catch (error) {
    console.error(
      "Errore nel recupero dei videogiochi completati dell'utente",
      error,
    );
    res.status(400);
  }
});

//primi 3 videogiochi completati di un utente
router.get("/top3/complete/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const usergame = await UserGameSchema.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    const complete = usergame
      .filter((item) => item.status === "completed")
      .slice(0, 3);

    const result = await Promise.all(
      complete.map(async (item) => {
        const game = await GamesSchema.findById(item.gameId).lean();

        return {
          ...item.toObject(),
          game,
        };
      }),
    );

    res.json(result);
  } catch (error) {
    console.error(
      "Errore nel recupero dei videogiochi completati dell'utente",
      error,
    );
    res.status(400);
  }
});

//ore di gioco totali di un utente
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
    await updateUser?.save();

    res.json(hours);
  } catch (error) {
    console.error(
      "Errore nel recupero delle ore totali giocate dall'utente",
      error,
    );
    res.status(400);
  }
});

//aggiungi un gioco
router.post("/:id", auth, async (req: any, res) => {
  try {
    const id = Number(req.params.id);
    const game = await GamesSchema.findOne({
      igdbId: id,
    });

    if (!game) {
      return res.status(404).json({
        error: "Gioco non trovato",
      });
    }

    //controllo se il gioco è già stato aggiunto dall'utente
    const alreadyExists = await UserGame.findOne({
      userId: req.user.id,
      igdbId: game.id,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Gioco già aggiunto",
      });
    }

    let {
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

    //controllo se il gioco è segnato come preferito, in tal caso tolgo la preferenza a tutti gli altri giochi dell'utente
    if (isFavorite) {
      await UserGame.updateMany(
        { userId: req.user.id, isFavorite: true },
        { isFavorite: false },
      );
    }

    //controllo che se non è suggerito da giocare non risulti null
    if (wouldRecommend === null) {
      return (wouldRecommend = false);
    }

    const addGame = new UserGameSchema({
      userId: req.user.id,
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
    return res.status(201).json(addGame);
  } catch (error) {
    console.error("Errore nell'aggiunta del gioco", error);
    res.status(400);
  }
});

export default router;

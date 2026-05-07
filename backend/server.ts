import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import games from "./routes/games.ts";
import users from "./routes/users.ts";
import usergame from "./routes/usergame.ts";

dotenv.config();

const app = express();
app.use(express.json());

async function start() {
  try {
    //db
    const mongouri = process.env.MONGO_URI;
    if (!mongouri) {
      throw new Error("MONGO_URI non definita nel file .env");
    }
    await mongoose.connect(mongouri);
    console.log("Connesso al db");

    //routes
    app.use("/games", games);
    app.use("/users", users);
    app.use("/usergame", usergame);

    //server
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Backend connesso sulla porta ${port}`);
    });
  } catch (error) {
    console.error("Errore di connessione", error);
  }
}

start();

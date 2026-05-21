import axios from "axios";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { fetchGames } from "./services/igdb.service.ts";
import Games from "./models/games.ts";

dotenv.config();

async function getAccessToken() {
  //prende token
  const tokenResponse = await axios.post(
    "https://id.twitch.tv/oauth2/token",
    null,
    {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      },
    },
  );
  console.log("token ok");
  return tokenResponse.data.access_token;
}

async function seed() {
  try {
    //connessione al db
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI non definita nel file .env");
    }
    await mongoose.connect(mongoUri);
    console.log("db connesso");

    const token = await getAccessToken();

    //giochi
    //await Games.deleteMany({});
    const limit = 200;
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const games = await fetchGames(token, limit, offset);

      if (!games || games.length === 0) {
        hasMore = false;
        break;
      }

      const bulkOps = games.map((game: any) => ({
        updateOne: {
          filter: { igdbId: game.id },
          update: {
            $set: {
              igdbId: game.id,
              title: game.name,
              coverImage: game.cover ? `https:${game.cover.url}` : "",
              genres: game.genres ? game.genres.map((g: any) => g.name) : [],
              rating: game.rating || 0,
              summary: game.summary,
              releaseDate: game.first_release_date
                ? new Date(game.first_release_date * 1000)
                : null,
              totalFollows: game.follows || 0,
              publishers: game.involved_companies
                ? game.involved_companies
                    .filter((c: any) => c.publisher)
                    .map((c: any) => c.company.name)
                : [],
            },
          },
          upsert: true,
        },
      }));

      await Games.bulkWrite(bulkOps, { ordered: false });

      offset += limit;

      if (offset > 428000) break;

      console.log(`Fetching games offset=${offset}`);
      console.log(`Ricevuti ${games.length} giochi`);
    }

    console.log("Database popolato");
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

seed();

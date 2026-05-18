import axios from "axios";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { fetchGames } from "./services/igdb.service.ts";
import Games from "./models/games.ts";
import Users from "./models/users.ts";
import UserGame from "./models/usergame.ts";

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

    /*utenti
    await Users.deleteMany({});
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user1 = await Users.create({
      username: "user1",
      email: "user1@gmail.com",
      passwordHash: "1234",
      avatar: "../frontend/assets/images/logo.svg",
      bio: "Amo The Last of Us",
      favoriteGenres: ["Adventures", "Arcade", "Racing"],
      followersCount: 12,
      followingCount: 15,
      gamesCompleted: 5,
      totalHoursPlayed: 326,
    });
    const user2 = await Users.create({
      username: "user2",
      email: "user2@gmail.com",
      passwordHash: "1234",
      avatar: "../frontend/assets/images/logo.svg",
      bio: "Amo Gta",
      favoriteGenres: ["Adventures", "Role-playing (RPG)"],
      followersCount: 5,
      followingCount: 4,
      gamesCompleted: 3,
      totalHoursPlayed: 265,
    });*/

    //giochi
    const limit = 500;
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const games = await fetchGames(token, limit, offset);
      if (!games || games.length === 0) {
        hasMore = false;
        break;
      }
      for (const game of games) {
        await Games.updateOne(
          { igdbId: game.id },
          {
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
          { upsert: true },
        );
      }
      offset += limit;
      if (offset > 428000) break; //sicurezza
    }

    /*utenti e giochi
    await UserGame.deleteMany({});
    const games = await Games.find().limit(4);
    const gameuser1 = await UserGame.create({
      userId: user1._id,
      gameId: games[0]._id,
      status: "playing",
      completionPercentage: 56,
      personalRating: null,
      inspirationLevel: 8,
      hoursPlayed: 17,
      isFavorite: false,
      wouldRecommend: true,
      notes: "Figo ma lungo",
    });
    const gameuser2 = await UserGame.create({
      userId: user2._id,
      gameId: games[1]._id,
      status: "playing",
      completionPercentage: 34,
      personalRating: null,
      inspirationLevel: 6,
      hoursPlayed: 12,
      isFavorite: false,
      wouldRecommend: false,
      notes: "Non sta superando le aspettative anzi peggio",
    });
    const gameuser3 = await UserGame.create({
      userId: user1._id,
      gameId: games[2]._id,
      status: "completed",
      completionPercentage: 100,
      personalRating: 9,
      inspirationLevel: 7,
      hoursPlayed: 50,
      isFavorite: true,
      wouldRecommend: true,
      notes: "Miglior gioco di sempre",
    });
    const gameuser4 = await UserGame.create({
      userId: user2._id,
      gameId: games[3]._id,
      status: "dropped",
      completionPercentage: 67,
      personalRating: 3,
      inspirationLevel: 7,
      hoursPlayed: 21,
      isFavorite: false,
      wouldRecommend: false,
      notes: "Mi annoia",
    });*/

    console.log("Database popolato");
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

seed();

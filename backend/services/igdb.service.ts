import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Games from "../models/games";

dotenv.config();

async function getGames() {
  try {
    //connessione al db
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI non definita nel file .env");
    }
    await mongoose.connect(mongoUri);
    console.log("db connesso");

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
    const accessToken = tokenResponse.data.access_token;
    console.log("token ok");

    //chiede i giochi a twitch (IGDB)
    const gamesResponse = await axios.post(
      "https://api.igdb.com/v4/games",
      `
            fields
                id,
                name,
                genres.name,
                cover.url,
                rating,
                summary,
                follows,
                first_release_date,
                involved_companies.company.name,
                involved_companies.publisher;
            limit 10;
            `,
      {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      },
    );
    for (const game of gamesResponse.data) {
      await Games.create({
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
      });
    }
    console.log("Giochi salvati");
  } catch (error) {
    console.error(error);
  }
}

getGames();

/*
export async function getAccessToken() {
  try {
    const response = await axios.post(
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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getAccessToken();
*/

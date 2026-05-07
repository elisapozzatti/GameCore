import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Games from "../models/games.ts";

dotenv.config();

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

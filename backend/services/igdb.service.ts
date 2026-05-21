import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function fetchGames(token: string, limit: number, offset: number) {
  try {
    const date = new Date();
    const now = new Date(date.getFullYear() - 1, 0, 1); //1 gennaio anno scorso
    const nowTs = Math.floor(now.getTime() / 1000); //converte data in timestamp
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
        sort id asc;
        limit ${limit};
        offset ${offset};
        `,
      {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    return gamesResponse.data;
  } catch (error) {
    console.error(error);
  }
}

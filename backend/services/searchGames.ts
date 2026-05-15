import axios from "axios";

export async function searchGames(token: string, query: string) {
  try {
    const response = await axios.post(
      "https://api.igdb.com/v4/games",
      `
      search "${query}";
      
      fields
        id,
        name,
        cover.url,
        first_release_date;

      limit 10;
      `,
      {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

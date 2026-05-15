import axios from "axios";

let accessToken = "";
let expiresAt = 0;

export async function getTwitchToken() {
  //se il token è ancora valido lo riusa
  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

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

    accessToken = response.data.access_token;

    //salva scadenza
    expiresAt = Date.now() + response.data.expires_in * 1000;

    return accessToken;
  } catch (error) {
    console.error("Errore token Twitch:", error);
    throw error;
  }
}

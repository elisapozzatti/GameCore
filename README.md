Ancora in sviluppo.
Applicazione sviluppata con react native, express e mongodb.

breve spiegazione:
App per giocatori di videogame dove possono aggiungere i giochi a cui giocano o che vogliono giocare, inserendo
varie informazioni come grado di ispirazione, percentuale di completamento, voto se l'hanno finito...
Potranno visualizzare i loro dati con il genere più giocato, il gioco preferito e i vari dati dei vari giochi.
Inoltre ci sarà una parte dell'applicazione dedicata a vedere come sono messi gli altri utenti su altri giochi o altro.

sviluppo:
-sviluppo applicazione fullstack per gestione dei giochi per ogni utente
-giochi recuperati da twitch developers (db con 42395 giochi)
-sistema di autenticazione
-CRUD completo sui giochi
-gestione percentuale di completamento dei giochi
-API REST per comunicazione frontend-backend
-deploy dell’applicazione (Render, MongoDB Atlas)

come eseguire:

- clona la repository
- frontend: npm install e poi npx expo start (se si scannerizza il qrcode e si ha sul telefono l'app "expo go" si può
  visualizzare da telefono)
- backend: node server.ts

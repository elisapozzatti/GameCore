database con collection:

- giochi
- utenti
- giochi dell'utente

routes:

- auth (per login e register)

- giochi (chiama tutti i giochi e filtra i giochi in base a cosa si scrive)
- utenti (chiama tutti gli utenti e recupera i dati di un singolo utente)
- giochi di ogni utente (chiama tutti i giochi di ogni utente, chiama i giochi di un singolo utente, il gioco preferito, le ore totali giocate, i giochi completati, i giochi a cui si sta giocando attualmente e post per aggiungere dei giochi a quell'utente)

middleware:

- auth: per prendere il token e togliere le parti non necessarie e salvarlo.

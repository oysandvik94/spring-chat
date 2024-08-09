# Spring Chat

Demo webapp

## Kjøring

### Db

```bash
cd backend/docker
docker compose up
```

### Backend

```bask
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## Bruking

Dette er en enkel chat app over websocket.

1. Logg inn med et brukernavn
2. Skriv inn navn på ønsket chat rom øverst til venstre, og klikk join
3. Send meldinger

Åpne browser i inkognito for å teste flere sessions som chatter med hverandre

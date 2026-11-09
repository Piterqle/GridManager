# GridManager API

The API stores students in a Neon PostgreSQL database.

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to the connection string from Neon. Keep `.env` private.
2. From this directory, run `npm install` and `npm run dev`. Keep the API running while using the desktop app.

The server creates the `alunos` table on startup. It listens on `HOST` and `PORT` (defaults: `127.0.0.1:3000`) and exposes `GET /health`, `GET`/`POST /api/aluno`, and `PUT /api/aluno/:id`.

The Electron main process calls this API at `GRIDMANAGER_API_URL` or `http://127.0.0.1:3000/api`. If the API runs at another address, set `GRIDMANAGER_API_URL` in the Electron process environment.

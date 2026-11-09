import app from "./app";
import { database, initializeDatabase } from "./services/Database";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "127.0.0.1";

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT deve ser um número entre 1 e 65535.");
}

async function startServer(): Promise<void> {
    try {
        await initializeDatabase();
        app.listen(port, host, () => {
            console.log(`[SERVER] API disponível em http://${host}:${port}`);
        });
    } catch (error) {
        console.error("[SERVER] Não foi possível conectar ao Neon ou preparar o banco:", error);
        await database.end();
        process.exitCode = 1;
    }
}

void startServer();
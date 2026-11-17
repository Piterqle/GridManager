import express from "express";
import alunoRouter from "./Aluno/presentation/alunoRouter";
import { database } from "./services/Database";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", async (_req, res) => {
    await database.query("SELECT 1");
    res.json({ status: "ok" });
});

app.use("/api/aluno", alunoRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("[SERVER] Erro ao processar requisição:", error);

    const status = typeof error === "object" && error !== null && "status" in error
        && typeof error.status === "number" && error.status >= 400 && error.status < 500
        ? error.status
        : 500;
    const message = status === 500 ? "Erro interno do servidor." : "Requisição inválida.";
    res.status(status).json({ error: message });
});

export default app
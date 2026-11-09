import { Router } from "express";
import AlunoController from "./alunoController";

const alunoRouter = Router()
const alunoController = new AlunoController();

alunoRouter.get("/", alunoController.ReadAlunos);
alunoRouter.post("/", alunoController.AddAluno);
alunoRouter.put("/:id", alunoController.UpdateAluno);

export default alunoRouter;
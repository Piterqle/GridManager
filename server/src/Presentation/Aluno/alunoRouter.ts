import { Router } from "express";
import AlunoController from "../Aluno/alunoController";
import { validateBody } from "../Middleware/validateBody";
import { CreateAlunoDTO, UpdateAlunoDTO } from "../../Aplication/DTO/AlunoDTO/AlunoDTO";

const alunoRouter = Router()
const alunoController = new AlunoController();

alunoRouter.get("/", alunoController.ReadAlunos);
alunoRouter.post("/", validateBody(CreateAlunoDTO), alunoController.AddAluno);
alunoRouter.put("/:id", validateBody(UpdateAlunoDTO), alunoController.UpdateAluno);

export default alunoRouter;
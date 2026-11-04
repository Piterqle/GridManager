import { Router } from "express";

const alunoRouter = Router()

alunoRouter.get('/', (req, res) => {
    res.send('Hello from Aluno Router');
});

export default alunoRouter;
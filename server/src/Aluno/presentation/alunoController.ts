import { alunoUseCase } from "../../services/DependecyServices";


class AlunoController {
    

    AddAluno(req: any, res: any) {
        const { Nome,
        modalidade,
        data_procura,
        data_experiencia, 
        semena,
        horario,
        contato,
        status} = req.body;
        const aluno = alunoUseCase.CreateAluno(Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status);
        res.status(201).json(aluno);
    }
}
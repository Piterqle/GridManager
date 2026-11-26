import type { RequestHandler } from "express";
import Aluno from "../../Domain/entities/AlunoEntidade/alunoClass";
import { alunoReadUseCase, alunoUseCase } from "../../services/DependecyServices";
import { CreateAlunoDTOType } from "../../Aplication/DTO/AlunoDTO/AlunoDTO";

type AlunoDados = Omit<Aluno, "id">;

const camposAluno: (keyof AlunoDados)[] = [
    "nome",
    "modalidade",
    "data_procura",
    "data_experiencia",
    "semana",
    "horario",
    "contato",
    "status"
];

function isAlunoDados(body: unknown): body is AlunoDados {
    if (typeof body !== "object" || body === null) {
        return false;
    }

    return camposAluno.every((campo) => typeof (body as Record<string, unknown>)[campo] === "string" || 
                            (campo === "status" && typeof (body as Record<string, unknown>)[campo] === "number"));
}

class AlunoController {
    ReadAlunos: RequestHandler = async (req, res) => {
        const modalidade = req.query.modalidade ?? "";
        if (typeof modalidade !== "string") {
            res.status(400).json({ error: "O filtro modalidade deve ser um texto." });
            return;
        }

        const filtro = modalidade === "All" ? "" : modalidade;
        res.json(await alunoReadUseCase.execute(filtro));
    };

    AddAluno: RequestHandler = async (req, res) => {
        console.log("Recebendo dados do aluno:", req.body);
        const alunoCreateDTO: CreateAlunoDTOType = req.body;

        const aluno = await alunoUseCase.CreateAluno(alunoCreateDTO);
        return res.status(201).json({
            message: "Aluno criado com sucesso."
        });
    };

    UpdateAluno: RequestHandler = async (req, res) => {
        const { id } = req.params;
        if (typeof id !== "string" || !/^[1-9]\d*$/.test(id)) {
            res.status(400).json({ error: "O id do aluno deve ser um inteiro positivo." });
            return;
        }
        if (!isAlunoDados(req.body)) {
            res.status(400).json({ error: "Os dados do aluno estão incompletos ou inválidos." });
            return;
        }

        const aluno = await alunoUseCase.UpdateAluno(new Aluno(
            id,
            req.body.nome,
            req.body.modalidade,
            req.body.data_procura,
            req.body.data_experiencia,
            req.body.semana,
            req.body.horario,
            req.body.contato,
            req.body.status
        ));

        if (!aluno) {
            return res.status(404).json({ 
                error: "Aluno não encontrado." }
            );
        }

        return res.status(200).json({
            message: "Aluno editado com sucesso."
        });
    };
}

export default AlunoController;
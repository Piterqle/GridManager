import Aluno from "../entities/alunoClass";

interface IAlunoRepository{
    CreateAluno(Aluno: Aluno): Promise<void>;
    ReadAlunos(modalidade: string): Promise<Aluno[]>;
    UpdateAluno(Aluno: Aluno): Promise<void>;
}

export default IAlunoRepository
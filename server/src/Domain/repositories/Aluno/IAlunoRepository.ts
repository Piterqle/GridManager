import Aluno from "../entities/alunoClass";

interface IAlunoRepository{
    CreateAluno(Aluno: Aluno): Promise<Aluno>;
    ReadAlunos(modalidade: string): Promise<Aluno[]>;
    UpdateAluno(Aluno: Aluno): Promise<Aluno | null>;
}

export default IAlunoRepository
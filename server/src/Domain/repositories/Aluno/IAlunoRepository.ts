import Aluno from "../../../Domain/entities/AlunoEntidade/alunoClass";

interface IAlunoRepository{
    ReadAluno(id: string): Promise<Aluno | null>;
    CreateAluno(Aluno: Aluno): Promise<Aluno>;
    ReadAlunos(modalidade: string): Promise<Aluno[]>;
    UpdateAluno(Aluno: Aluno): Promise<Aluno | null>;
}

export default IAlunoRepository
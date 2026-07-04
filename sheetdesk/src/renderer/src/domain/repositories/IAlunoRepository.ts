import Aluno from "../entidades/alunoClass";


interface IAlunoRepository{
    salvar(Aluno: Aluno): Promise<void>;
    listar(modalidade: string): Promise<Aluno[]>;
    update(Aluno: Aluno): Promise<void>;
}

export default IAlunoRepository
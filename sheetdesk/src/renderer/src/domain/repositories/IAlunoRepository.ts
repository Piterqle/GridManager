import Aluno from "../entidades/alunoClass";


interface IAlunoRepository{
    salvar( Aluno: Aluno): Promise<void>;

    listar( modalidade: string): Promise<Aluno[]>;
}

export default IAlunoRepository
import Aluno from "../entidades/alunoClass";


interface IAlunoRepository{
    salvar( Aluno: Aluno): Promise<void>;

    listar( tipoReturn: string, modalidade: string): Promise<Aluno[]>;
}

export default IAlunoRepository
import Aluno from "../../../Domain/entities/AlunoEntidade/alunoClass";
import IAlunoRepository from "../../../Domain/repositories/Aluno/IAlunoRepository";

class AlunoUseCase {

    constructor(private readonly  alunoRepository: IAlunoRepository) { }
    
    async CreateAluno(dados: Omit<Aluno, "id">): Promise<Aluno> {
        const aluno = new Aluno(
            "",
            dados.nome,
            dados.modalidade,
            dados.data_procura,
            dados.data_experiencia,
            dados.semana,
            dados.horario,
            dados.contato,
            dados.status
        );
        return await this.alunoRepository.CreateAluno(aluno);
    }

    async UpdateAluno(dados: Aluno): Promise<Aluno | null> {
        const aluno = new Aluno(
            dados.id,
            dados.nome,
            dados.modalidade,
            dados.data_procura,
            dados.data_experiencia,
            dados.semana,
            dados.horario,
            dados.contato,
            dados.status
        );
        return await this.alunoRepository.UpdateAluno(aluno);
    }
}

export default AlunoUseCase
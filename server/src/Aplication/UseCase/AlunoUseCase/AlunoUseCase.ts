import Aluno from "../../../Domain/entities/AlunoEntidade/alunoClass";
import { alunoStatus } from "../../../Domain/object/alunoStatus";
import IAlunoRepository from "../../../Domain/repositories/Aluno/IAlunoRepository";
import { CreateAlunoDTOType } from "../../DTO/AlunoDTO/AlunoDTO";

class AlunoUseCase {

    constructor(private readonly alunoRepository: IAlunoRepository) { }

    async ReadAluno(id: string): Promise<Aluno | null> {
        const aluno = await this.alunoRepository.ReadAluno(id);
        return aluno
    }

    async CreateAluno(dados: Omit<CreateAlunoDTOType, "id">): Promise<Aluno> {
        const aluno = new Aluno(
            "",
            dados.nome,
            dados.modalidade,
            dados.data_procura,
            dados.data_experiencia,
            dados.semana,
            dados.horario,
            dados.contato,
            alunoStatus[dados.status as unknown as keyof typeof alunoStatus]
        );
        return await this.alunoRepository.CreateAluno(aluno);
    }

    async UpdateAluno(dados: Aluno): Promise<Aluno | null> {

        if (!dados.id || !/^[1-9]\d*$/.test(dados.id)) throw new Error("O id do aluno deve ser um inteiro positivo.");

        const aluno = await this.alunoRepository.ReadAluno(dados.id);
        if (!aluno) throw new Error("Aluno não encontrado.");

        aluno.AlterarNome(dados.nome)
        aluno.AlterarModalidade(dados.modalidade)
        aluno.AlterarDataProcura(dados.data_procura)
        aluno.AlterarDataExperiencia(dados.data_experiencia)
        aluno.AlterarSemana(dados.semana)
        aluno.AlterarHorario(dados.horario)
        aluno.AlterarContato(dados.contato)
        aluno.AlterarStatus(dados.status)

        return await this.alunoRepository.UpdateAluno(aluno);
    }
}

export default AlunoUseCase
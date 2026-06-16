import Aluno from "@renderer/domain/entidades/alunoClass"
import IAlunoRepository  from "@renderer/domain/repositories/IAlunoRepository"

export class AdicionarAlunoUseCase {
    constructor(private alunoRepository: IAlunoRepository) {}

    async execute(Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status) {

        const aluno = 
            new Aluno(Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status)
        

        await this.alunoRepository.salvar(aluno)
    }
}
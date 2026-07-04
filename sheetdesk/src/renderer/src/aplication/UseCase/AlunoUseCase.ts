import Aluno from "@renderer/domain/entities/alunoClass";
import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";
import Types from "@renderer/shared/Types";
import { inject, injectable } from "inversify";


@injectable()
class AlunoUseCase {

    constructor(
        @inject(Types.IAlunoRepository)
        private alunoRepository) { }
    

    async CreateAluno(Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status) {

        const aluno = 
            new Aluno("", Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status)
        return await this.alunoRepository.CreateAluno(aluno);
    }

    async UpdateAluno(Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status) {

        const aluno = 
            new Aluno("", Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status)
        return await this.alunoRepository.UpdateAluno(aluno);
    }
}

export default AlunoUseCase
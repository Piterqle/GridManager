import Aluno from "../../domain/entities/alunoClass";
import IAlunoRepository from "../../domain/repositories/IAlunoRepository";

class AlunoUseCase {

    constructor(private readonly  alunoRepository: IAlunoRepository) { }
    

    async CreateAluno(Nome: string, 
        modalidade: string, 
        data_procura: string, 
        data_experiencia: string, 
        semena: string, 
        horario: string, 
        contato: string, 
        status: string
    ) {

        const aluno = 
            new Aluno("", Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status)
        return await this.alunoRepository.CreateAluno(aluno);
    }

    async UpdateAluno(
        Nome: string, 
        modalidade: string, 
        data_procura: string, 
        data_experiencia: string, 
        semena: string, 
        horario: string, 
        contato: string, 
        status: string
    ) : Promise<void>  {

        const aluno = 
            new Aluno("", Nome, modalidade, data_procura, data_experiencia, semena, horario, contato, status)
        return await this.alunoRepository.UpdateAluno(aluno);
    }
}

export default AlunoUseCase
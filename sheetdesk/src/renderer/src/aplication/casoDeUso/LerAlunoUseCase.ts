import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";

class LerAlunoUseCase{
    constructor(private IAlunoRepository: IAlunoRepository){}

    async execute(tipoReturn: string, modalidade: string) {
        return await this.IAlunoRepository.listar(tipoReturn, modalidade);
    }
}


export default LerAlunoUseCase
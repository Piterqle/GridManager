import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";

class LerAlunoUseCase{
    constructor(private IAlunoRepository: IAlunoRepository){}

    async execute(modalidade: string) {
        if (modalidade.trim() !== "") {
            modalidade = `Modalidade == "${modalidade}"`;
        }
        return await this.IAlunoRepository.listar(modalidade);
    }
}


export default LerAlunoUseCase
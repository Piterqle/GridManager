import IAlunoRepository from "../../domain/repositories/IAlunoRepository";

class LerAlunoUseCase {
    constructor(private readonly _alunoRepository: IAlunoRepository) { }

    async execute(modalidade: string) {
        if (modalidade.trim() !== "") {
            modalidade = `Modalidade == "${modalidade}"`;
        }
        return await this._alunoRepository.ReadAlunos(modalidade);
    }
}


export default LerAlunoUseCase
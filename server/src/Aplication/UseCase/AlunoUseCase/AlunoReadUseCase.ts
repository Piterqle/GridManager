import IAlunoRepository from "../../../Domain/repositories/Aluno/IAlunoRepository";

class LerAlunoUseCase {
    constructor(private readonly _alunoRepository: IAlunoRepository) { }

    async execute(modalidade: string) {
        return this._alunoRepository.ReadAlunos(modalidade);
    }
}


export default LerAlunoUseCase
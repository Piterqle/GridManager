import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";
import Types from "@renderer/shared/Types";
import { inject, injectable } from "inversify";

@injectable()
class LerAlunoUseCase {
    constructor(
        @inject(Types.IAlunoRepository)
        private _alunoRepository
    ) { }

    async execute(modalidade: string) {
        if (modalidade.trim() !== "") {
            modalidade = `Modalidade == "${modalidade}"`;
        }
        return await this._alunoRepository.ReadAlunos(modalidade);
    }
}


export default LerAlunoUseCase
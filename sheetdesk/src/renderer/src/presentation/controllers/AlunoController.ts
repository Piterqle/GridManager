import { AdicionarAlunoUseCase } from "@renderer/aplication/casoDeUso/AdicionarAlunoExperimental";
import LerAlunoUseCase from "@renderer/aplication/casoDeUso/LerAlunoUseCase";


class AlunoController {
    constructor(
        private adicionarAlunoUseCase : AdicionarAlunoUseCase,
        private lerAlunoUseCase: LerAlunoUseCase,
    ){}

    async lerDados(tipoReturn: string, modalidade: string) {
        await this.lerAlunoUseCase.execute(tipoReturn, modalidade)
    }

    async adicionar(dados: {
        nome: string,
        modalide: string
        data_procura: string,
        data_inicio: string,
        semana: string, 
        horario:string,
        contato: string,
        status: string,
    }){
        await this.adicionarAlunoUseCase.execute(dados.nome, dados.modalide, dados.data_procura, dados.data_inicio, dados.semana, dados.horario, dados.contato, dados.status)
    }
}

export const alunoController = new AlunoController(AdicionarAlunoUseCase, LerAlunoUseCase);
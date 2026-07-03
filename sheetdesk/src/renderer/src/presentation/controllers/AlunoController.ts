import { AdicionarAlunoUseCase } from "@renderer/aplication/casoDeUso/AdicionarAlunoExperimental";
import LerAlunoUseCase from "@renderer/aplication/casoDeUso/LerAlunoUseCase";


class AlunoController {
        constructor(
            private adicionarAlunoUseCase : AdicionarAlunoUseCase,
            private lerAlunoUseCase: LerAlunoUseCase,
        ){}

    async lerDados(modalidade: string) {
        return await this.lerAlunoUseCase.execute(modalidade)
    }

    async adicionar(dados: {
        nome: string,
        modalidade: string
        data_procura: string,
        data_experiencia: string,
        semana: string, 
        horario:string,
        contato: string,
        status: string,
    }){
        await this.adicionarAlunoUseCase.execute(dados.nome, dados.modalidade, dados.data_procura, dados.data_experiencia, dados.semana, dados.horario, dados.contato, dados.status)    
    }


}

export default AlunoController
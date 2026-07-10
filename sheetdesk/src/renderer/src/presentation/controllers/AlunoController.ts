import { AdicionarAlunoUseCase } from "@renderer/aplication/casoDeUso/AdicionarAlunoExperimental";
import LerAlunoUseCase from "@renderer/aplication/casoDeUso/LerAlunoUseCase";
import { UpdateAlunoUseCase } from "@renderer/aplication/casoDeUso/UpdateAlunoUseCase";


class AlunoController {
        constructor(
            private adicionarAlunoUseCase : AdicionarAlunoUseCase,
            private atualizarAlunoUseCase : UpdateAlunoUseCase,
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

    async atualizar(AlunoId: string, dados: {
         nome: string,
        modalidade: string
        data_procura: string,
        data_experiencia: string,
        semana: string, 
        horario:string,
        contato: string,
        status: string,})    
    {
        await this.atualizarAlunoUseCase.execute(AlunoId, dados)
    }

}

export default AlunoController
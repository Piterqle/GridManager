import { AdicionarAlunoUseCase } from "@renderer/aplication/UseCase/AdicionarAlunoExperimental";
import LerAlunoUseCase from "@renderer/aplication/UseCase/AlunoReadUseCase";


class AlunoController {
        constructor(
            private adicionarAlunoUseCase : AdicionarAlunoUseCase,
            private lerAlunoUseCase: LerAlunoUseCase,
        ){}

    async ReadAlunos(modalidade: string, setLoading: (loading: boolean) => void) {
        setLoading(true)
        const data = await this.lerAlunoUseCase.execute(modalidade == "All" ? "" : modalidade);
        setLoading(false)
        return data
    }

    async CreateAluno(dados: {
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
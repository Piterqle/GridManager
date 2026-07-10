import Aluno from "@renderer/domain/entidades/alunoClass"
import IAlunoRepository  from "@renderer/domain/repositories/IAlunoRepository"


export class UpdateAlunoUseCase {
    constructor(private readonly alunoRepository: IAlunoRepository) { }

    async execute(AlunoId: string, dados: { nome: string,
        modalidade: string,
        data_procura: string,
        data_experiencia: string,
        semana: string, 
        horario:string,
        contato: string,
        status: string,}): Promise<void> {
        try {
            const aluno = await new Aluno(AlunoId, dados.nome, dados.modalidade, dados.data_procura, dados.data_experiencia, dados.semana, dados.horario, dados.contato, dados.status);
            await this.alunoRepository.update(aluno);
        } catch (error: any) {
            throw new Error("Erro ao atualizar aluno: " + error.message);
        }
    }

}
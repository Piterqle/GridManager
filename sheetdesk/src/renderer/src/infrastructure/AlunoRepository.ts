import Aluno from "@renderer/domain/entities/alunoClass";
import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";
import { injectable } from "inversify";

@injectable()
class AlunoRepository
    implements IAlunoRepository {

    async CreateAluno(Aluno: Aluno): Promise<void> {
        const filePath = localStorage.getItem('excelFilePath')
        if (filePath === "" || filePath === null) { throw new Error("Arquivo não encontrado nao localStorage"); }

        await window.api.addDB(filePath, Aluno)

    }

    async ReadAlunos(modalidade: string): Promise<Aluno[]> {
        try {

            return await window.api.readDB(modalidade)
        } catch (e) {
            throw new Error("Usuarios não encontrados: " + e)
        }
    }

    async UpdateAluno(Aluno: Aluno): Promise<void> {
        try {
            return await window.api.editDB(Aluno)
        }
        catch (e) {
            throw new Error("Erro ao editar usuario: " + e)
        }
    }

}


export default AlunoRepository
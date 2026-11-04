import Aluno from "../domain/entities/alunoClass";
import IAlunoRepository from "../domain/repositories/IAlunoRepository";

class AlunoRepository
    implements IAlunoRepository {

    async CreateAluno(Aluno: Aluno): Promise<void> {
        const filePath = localStorage.getItem('excelFilePath')
        if (filePath === "" || filePath === null) { throw new Error("Arquivo não encontrado nao localStorage"); }

        return

    }

    async ReadAlunos(modalidade: string): Promise<Aluno[]> {
        try {

            return Promise<Aluno[]>
        } catch (e) {
            throw new Error("Usuarios não encontrados: " + e)
        }
    }

    async UpdateAluno(Aluno: Aluno): Promise<void> {
        try {
            return 
        }
        catch (e) {
            throw new Error("Erro ao editar usuario: " + e)
        }
    }

}


export default AlunoRepository
import Aluno from "@renderer/domain/entidades/alunoClass";
import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";


class AlunoRepository
    implements IAlunoRepository {

    async salvar(Aluno: Aluno): Promise<void> {
        const filePath = localStorage.getItem('excelFilePath')
        if (filePath === "" || filePath === null) { throw new Error("Arquivo não encontrado nao localStorage"); }

        await window.api.addDB(filePath, Aluno)

    }

    async listar(modalidade): Promise<Aluno[]> {
        try {

            return await window.api.readDB(modalidade)
        } catch (e) {
            throw new Error("Usuarios não encontrados: " + e)
        }
    }

    async update(Aluno: Aluno): Promise<void> {
        try {
            return await window.api.editDB(Aluno)
        }
        catch (e) {
            throw new Error("Erro ao editar usuario: " + e)
        }
    }

}


export default AlunoRepository
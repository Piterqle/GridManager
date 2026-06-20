import Aluno from "@renderer/domain/entidades/alunoClass";
import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";


class AlunoRepository
implements IAlunoRepository{
    
    async salvar(Aluno: Aluno): Promise<void> {
        const filePath = localStorage.getItem('excelFilePath')
        if (filePath === "" || filePath === null) {throw new Error("Arquivo não encontrado nao localStorage");}

        await window.api.addDB(filePath, Aluno)

    }

    async listar(tipoRetrun, modalidade): Promise<Aluno[]> {
        try {
            const filePath = localStorage.getItem('excelFilePath')
            if (filePath === "" || filePath === null) {throw new Error("Arquivo não encontrado nao localStorage");}

            return await window.api.readDB(filePath, tipoRetrun, modalidade)
        } catch(e) {
            throw new Error("Usuarios não encontrados: " + e)
        }
    }
}


export default AlunoRepository
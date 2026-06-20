import AlunoController from "../presentation/controllers/AlunoController";
import LerAlunoUseCase from "@renderer/aplication/casoDeUso/LerAlunoUseCase";
import AlunoRepository from "@renderer/infrastructure/AlunoRepository";
import { AdicionarAlunoUseCase } from "@renderer/aplication/casoDeUso/AdicionarAlunoExperimental";

const repository = new AlunoRepository
const useCaseLerAluno = new LerAlunoUseCase(repository)
const useCaseAddAluno = new AdicionarAlunoUseCase(repository)
const alunoController  = new AlunoController(useCaseAddAluno, useCaseLerAluno)



const formatDate = (date: string) => {
    const [YYYY, MM, dd] = date.split("-")
    
    const foramtedDate = `${dd}/${MM}/${YYYY}`
    return foramtedDate
}


export {alunoController, formatDate}
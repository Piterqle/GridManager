import AlunoController from "../presentation/controllers/AlunoController";
import UsuarioController from "../presentation/controllers/UserController"
import LerAlunoUseCase from "@renderer/aplication/casoDeUso/LerAlunoUseCase";
import AlunoRepository from "@renderer/infrastructure/AlunoRepository";
import { AdicionarAlunoUseCase } from "@renderer/aplication/casoDeUso/AdicionarAlunoExperimental";
import { UpdateAlunoUseCase } from "@renderer/aplication/casoDeUso/UpdateAlunoUseCase";

const repository = new AlunoRepository
const useCaseLerAluno = new LerAlunoUseCase(repository)
const useCaseAddAluno = new AdicionarAlunoUseCase(repository)
const useCaseUpdateAluno = new UpdateAlunoUseCase(repository)

const alunoController = new AlunoController(useCaseAddAluno, useCaseUpdateAluno, useCaseLerAluno)
const usuarioController = new UsuarioController()


const formatDate = (date: string) => {
    const [YYYY, MM, dd] = date.split("-")

    const foramtedDate = `${dd}/${MM}/${YYYY}`
    return foramtedDate
}

const formatDateToInput = (date: string) => {
    const [dd, MM, YYYY] = date.split("/")

    const foramtedDate = `${YYYY}-${MM}-${dd}`
    return foramtedDate
}

export { alunoController, usuarioController, formatDate, formatDateToInput }
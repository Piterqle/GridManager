import AlunoUseCase from "../Aplication/UseCase/AlunoUseCase/AlunoUseCase";
import AlunoReadUseCase from "../Aplication/UseCase/AlunoUseCase/AlunoReadUseCase";
import AlunoRepository from "../Infrastructure/AlunoRepository/AlunoRepository";

const alunoRepository = new AlunoRepository();
const alunoUseCase = new AlunoUseCase(alunoRepository);
const alunoReadUseCase = new AlunoReadUseCase(alunoRepository);

export { alunoUseCase, alunoReadUseCase };
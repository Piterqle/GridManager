import AlunoUseCase from "../Aluno/aplication/UseCase/AlunoUseCase";
import AlunoReadUseCase from "../Aluno/aplication/UseCase/AlunoReadUseCase";
import AlunoRepository from "../Aluno/infrastructure/AlunoRepository";

const alunoRepository = new AlunoRepository();
const alunoUseCase = new AlunoUseCase(alunoRepository);
const alunoReadUseCase = new AlunoReadUseCase(alunoRepository);

export { alunoUseCase, alunoReadUseCase };
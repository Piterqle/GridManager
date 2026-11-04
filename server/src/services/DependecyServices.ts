import AlunoUseCase from "../Aluno/aplication/UseCase/AlunoUseCase";
import AlunoRepository from "../Aluno/infrastructure/AlunoRepository";

const alunoRepository = new AlunoRepository();
const alunoUseCase = new AlunoUseCase(alunoRepository);

export { alunoUseCase };
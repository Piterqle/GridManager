import { alunoStatus } from "../object/alunoStatus";

class Aluno {
    constructor(
    public id: string = "", 
    public nome: string,
    public modalidade: string,
    public data_procura: string,
    public data_experiencia: string,
    public semana: string,
    public horario: string,
    public contato: string,
    public status: alunoStatus = alunoStatus.Matriculado
    ) {}

    matricular() {
        this.status = alunoStatus.Matriculado;
    }

    cancelarMatricula() {
        this.status = alunoStatus.Desistente;
    }
}

export default Aluno;

class Aluno {
    constructor(
    public nome: string,
    public modalidade: string,
    public data_procura: string,
    public data_experienciax: string,
    public semana: string,
    public horario: string,
    public contato: string,
    public status: string
    ) {}

    matricular() {
        this.status = "Matriculado";
    }

    cancelarMatricula() {
        this.status = "Cancelado";
    }
}

export default Aluno;
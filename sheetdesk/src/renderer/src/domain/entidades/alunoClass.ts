
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
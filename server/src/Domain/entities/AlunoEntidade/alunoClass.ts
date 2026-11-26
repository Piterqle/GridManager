import { alunoStatus } from "../../object/alunoStatus";

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

    AlterarNome(_nome: string) {
        this.nome = _nome
    }

    AlterarModalidade(_modalidade: string) {
        this.modalidade = _modalidade
    }

    AlterarDataProcura(_dataProcura: string){
        this.data_procura = _dataProcura
    }

    AlterarDataExperiencia(_dataExperiencia: string){
        this.data_experiencia = _dataExperiencia
    }

    AlterarSemana(_semana: string){
        this.semana = _semana
    }

    AlterarHorario(_horario: string){
        this.horario = _horario
    }

    AlterarContato(_contato: string){
        this.contato = _contato
    }

    AlterarStatus(_status: alunoStatus){
        this.status = _status
    }
}

export default Aluno;
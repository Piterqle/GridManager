import Aluno from "../../Domain/entities/AlunoEntidade/alunoClass";
import { alunoStatus } from "../../Domain/object/alunoStatus";
import IAlunoRepository from "../../Domain/repositories/Aluno/IAlunoRepository";
import { database } from "../../services/Database";

class AlunoRepository
    implements IAlunoRepository {

    async ReadAluno(id: string): Promise<Aluno | null> {
        const query = `SELECT
            id,
            nome,
            modalidade,
            data_procura,
            data_experiencia,
            semana,
            horario,
            contato,
            status
        FROM alunos 
        WHERE id = $1`

        const result = await database.query<AlunoRow>(query, [id])
        
        return toAluno(result.rows[0])
    }

    async CreateAluno(aluno: Aluno): Promise<Aluno> {
        const result = await database.query<AlunoRow>(
            `INSERT INTO alunos (
                nome, modalidade, data_procura, data_experiencia,
                semana, horario, contato, status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id, nome, modalidade, data_procura, data_experiencia,
                semana, horario, contato, status`,
            [
                aluno.nome,
                aluno.modalidade,
                aluno.data_procura,
                aluno.data_experiencia,
                aluno.semana,
                aluno.horario,
                aluno.contato,
                aluno.status
            ]
        );

        return toAluno(result.rows[0]);
    }

    async ReadAlunos(modalidade: string): Promise<Aluno[]> {
        const result = modalidade.trim()
            ? await database.query<AlunoRow>(
                `SELECT id, nome, modalidade, data_procura, data_experiencia,
                    semana, horario, contato, status
                 FROM alunos WHERE modalidade = $1 ORDER BY id`,
                [modalidade.trim()]
            )
            : await database.query<AlunoRow>(
                `SELECT id, nome, modalidade, data_procura, data_experiencia,
                    semana, horario, contato, status
                 FROM alunos ORDER BY id`
            );

        return result.rows.map(toAluno);
    }

    async UpdateAluno(aluno: Aluno): Promise<Aluno | null> {
        const result = await database.query<AlunoRow>(
            `UPDATE alunos SET
                nome = $2,
                modalidade = $3,
                data_procura = $4,
                data_experiencia = $5,
                semana = $6,
                horario = $7,
                contato = $8,
                status = $9
             WHERE id = $1
             RETURNING id, nome, modalidade, data_procura, data_experiencia,
                semana, horario, contato, status`,
            [
                aluno.id,
                aluno.nome,
                aluno.modalidade,
                aluno.data_procura,
                aluno.data_experiencia,
                aluno.semana,
                aluno.horario,
                aluno.contato,
                alunoStatus[aluno.status]
            ]
        );

        return result.rows[0] ? toAluno(result.rows[0]) : null;
    }

}

interface AlunoRow {
    id: string | number;
    nome: string;
    modalidade: string;
    data_procura: string;
    data_experiencia: string;
    semana: string;
    horario: string;
    contato: string;
    status: string;
}

function toAluno(row: AlunoRow): Aluno {
    return new Aluno(
        String(row.id),
        row.nome,
        row.modalidade,
        row.data_procura,
        row.data_experiencia,
        row.semana,
        row.horario,
        row.contato,
        row.status as any
    );
}

export default AlunoRepository;
import { z } from "zod";
import { alunoStatus } from "../../../Domain/object/alunoStatus";

export const AlunoBaseDTO = z
.object({
    nome: z.string().min(1, { message: "Nome é obrigatório" }),
    modalidade: z.string().min(1, { message: "Modalidade é obrigatória" }),
    contato: z.string().min(1, { message: "Contato é obrigatório" }),
    data_procura: z.coerce
        .string().min(1, { message: "Data de procura é obrigatória" }),
    data_experiencia: z.coerce.string().min(1, { message: "Data de experiência é obrigatória" }),
    semana: z.string().min(1, { message: "Semana é obrigatória" }),
    horario: z.string().min(1, { message: "Horário é obrigatório" }),
    status: z.enum(["Matriculado", "Desistente", "Realizado", "Agendado"], {
        message: "Status é obrigatório"
    })
}) 
    


// DTO para a criação de um aluno
export const CreateAlunoDTO = AlunoBaseDTO
    .refine((data) => data.data_procura < data.data_experiencia, {
        message: "Data de procura terá que ser antes da data de experiência"
    })
    .refine((data) => {
        const hoje = new Date();
        const dataHoje = [
            hoje.getFullYear(),
            String(hoje.getMonth() + 1).padStart(2, "0"),
            String(hoje.getDate()).padStart(2, "0")
        ].join("-");
        return data.data_procura <= dataHoje;
    }, {
        message: "Data de procura não pode ser posterior à data atual"
    });
export type CreateAlunoDTOType = z.infer<typeof AlunoBaseDTO>;

// DTO para a atualização de um aluno
export const UpdateAlunoDTO = AlunoBaseDTO
    .partial();
export type UpdateAlunoDTOType = z.infer<typeof UpdateAlunoDTO>;

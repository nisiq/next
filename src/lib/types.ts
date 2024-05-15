import { z } from "zod";
import { Key } from "react";

export enum Status {
    ToStart,
    Progress,
    Done
}

export interface ITableRow {
    title: string;
    id: string;
    data: DataExpandedRow[]
}

export type DataExpandedRow = {
    _id: string
    title: string
    description: string
    responsible: string
    status: string
    user_id: string
    group_id: string
    project: string
    date_due: string
    created_at: string
    __v: number
}


export const createTaskSchema = z.object({
    title: z.string().min(2),
    description: z.string(),
    responsible: z.string().min(4),
    status: z.enum(['A fazer', 'Em desenvolvimento', 'Finalizado']),
    date_due: z.string().max(10).min(10, "Preencha o campo de data corretamente"),
    project: z.string().min(4)
})

export type TCreateTaskSchema = z.infer<typeof createTaskSchema>;


export const validStatus = ['A fazer', 'Em desenvolvimento', 'Finalizado'] as const;
export type ValidStatus = typeof validStatus[number]

export type Id = Key | null | undefined;

export type Column = {
    id: Id;
    title: string

}

export type Task = {
    id: Id,
    columnId: Id,
    title: string,
    description: string,
    status: ValidStatus
}

export const createClassSchema = z.object({
    turma_number: z.string().min(1, "Campo digital solutions é obrigatório"),
    responsible: z.string().min(2, "Campo padrinho/madrinha é obrigatório"),
    shift: z.enum(['Vespertino', 'Matutino'])
})

export type TCreateClassSchema = z.infer<typeof createClassSchema>;

export const createGroupSchema = z.object({
    apprentice: z.string().min(1, "Campo aprendizes é obrigatório"),
    focalpoint: z.string().min(2, "Campo padrinho/madrinha é obrigatório"),
    area: z.string().min(2, "Campo área é obrigatório")
})

export type TCreateGroupSchema = z.infer<typeof createGroupSchema>;

// Diário
export enum Actions {
    Desenvolvimento,
    Dashboard,
    Fluxograma,
    Apresentação,
    Pesquisa
}

export const createRegSchema = z.object({
    title: z.string().min(3, "Campo título é obrigatório"),
    date_due: z.string().max(10).min(10, "Preencha o campo de data corretamente"),
    action: z.enum(['Desenvolvimento', 'Dashboard', 'Fluxograma', 'Apresentação', 'Pesquisa']),
    participants: z.string(),
    description: z.string().min(10, "Insira uma descrição válida."),
    url: z.string(),
})

export type TCreateRegSchema = z.infer<typeof createRegSchema>;


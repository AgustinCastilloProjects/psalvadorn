import { z } from "zod";

export const sportSchema = z.object({
    name: z.string().min(4, { message: 'Nome deve ter mais de 6 caracteres'}),
    playersPerTeam: z.preprocess((ppt) => parseInt(z.string().parse(ppt),10),z.number().min(1, { message: 'Número de jogadores por equipe deve ser maior do que 0'}).max(53, {message: "Número de jogadores por equipe deve ser menor que 53"})),
    rules: z.instanceof(FileList)
});

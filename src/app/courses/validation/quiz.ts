import { z } from 'zod';

export const CreateQuizSchema = z.object({
    question: z.string().min(1),
    options: z.array(z.string().min(1)).min(2),
    correctOption: z.number().int().min(0),
    explanation: z.string().min(1)
}).refine(data => data.correctOption >= 0 && data.correctOption < data.options.length, {
    message: "correctOption must be within the range of options",
    path: ['correctOption']
});

export type CreateQuizSchema = z.infer<typeof CreateQuizSchema>;


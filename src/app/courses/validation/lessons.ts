import { z } from 'zod';

export const CreateLessonSchema = z.object({
    lesson: z.number().min(1),
    sections: z.array(
        z.object({
            title: z.string().min(2),
            content: z.string().min(2)
        })
    ),
});

export type CreateLessonSchema = z.infer<typeof CreateLessonSchema>;


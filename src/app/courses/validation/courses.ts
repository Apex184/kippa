import { z } from 'zod';

export const CreateCoursesSchema = z.object({
    title: z.string().min(2),
});

export type CreateCoursesSchema = z.TypeOf<typeof CreateCoursesSchema>;

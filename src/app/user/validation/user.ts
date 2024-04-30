import { z } from 'zod';

export const CreateUserSchema = z.object({
    userName: z.string().min(2),
    enrolledCourse: z.string().min(2),
});

export type CreateUserSchema = z.TypeOf<typeof CreateUserSchema>;

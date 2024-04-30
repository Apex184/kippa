import { RequestHandler } from 'express';
import { CreateUserSchema } from '../validation';
import { ErrorMessage, logger } from '@/lib';
import { HttpError } from '@/lib/errors';
import { User } from '@/lib/models/user';

export const createUserController: RequestHandler<any, any, CreateUserSchema, any, { user: typeof User }> = async (
    req,
    res,
) => {
    try {
        const { userName, enrolledCourse } = req.body;
        const user = new User({ userName, enrolledCourse });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        logger.error(error);
    }
};
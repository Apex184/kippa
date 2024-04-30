import { RequestHandler } from 'express';
import { CreateCoursesSchema } from '../validation';
import { CourseRepository } from '@/lib/repositories';
import { ErrorMessage, ResponseMessage, logger } from '@/lib';
import { HttpError } from '@/lib/errors';
import { Course } from '@/lib/models';

export const createCourseController: RequestHandler<any, any, CreateCoursesSchema, any, { course: typeof Course }> = async (
    req,
    res,
) => {
    try {
        const { title } = req.body;
        const createCourse = new CourseRepository();
        const findOne = await createCourse.findCourseByTitle(title);
        if (findOne) {
            return res.status(400).json({ success: false, message: ErrorMessage.CourseTitle })
        }
        const course = await createCourse.createCourse({
            title,
        });
        return res.status(201).json({
            success: true,
            message: ResponseMessage.Success,
            data: course.title,
        });


    } catch (error: any) {
        logger.error(error);
        return res.status(500).json({
            success: false, message: error.message
        });
    }
};

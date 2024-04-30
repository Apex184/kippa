import { RequestHandler } from 'express';
import { CreateLessonSchema } from '../validation';
import { LessonRepository, CourseRepository } from '@/lib/repositories';
import { ErrorMessage, ResponseMessage, logger } from '@/lib';
import { HttpError } from '@/lib/errors';
import { Lesson, ISection } from '@/lib/models';

// export const createLessonController: RequestHandler<any, any, CreateLessonSchema, any, { course: typeof Lesson }> = async (
//     req,
//     res,
// ) => {
//     try {
//         const { title, sections } = req.body;
//         const courseId = req.params.courseId;
//         if (!courseId) return res.status(400).json({ success: false, message: ErrorMessage.Required });
//         const findCourseById = new CourseRepository();
//         const course = await findCourseById.findCourseById(courseId);
//         if (!course) {
//             return res.status(404).json({ success: false, message: ErrorMessage.CourseId });
//         }

//         const createLessons = new LessonRepository();
//         const findOne = await createLessons.findLessonByTitle(title);

//         if (findOne?.title === title) {
//             return res.status(400).json({
//                 success: false, message: `${title} ${ErrorMessage.Exists} `
//             })
//         }
//         const lesson = await createLessons.createLesson({
//             title,
//             sections,
//             courseId: courseId.toString(),
//         });
//         if (!lesson) {
//             return res.status(400).json({
//                 success: false, message: ErrorMessage.ServerError
//             });
//         }
//         course.lessons.push(lesson._id);
//         await course.save();
//         return res.status(201).json({
//             success: true,
//             message: ResponseMessage.Success,
//             data: {
//                 title: lesson.title,
//                 sections: lesson.sections,
//                 quiz: lesson.quiz,
//                 courseId: lesson.courseId,
//             }
//         });


//     } catch (error: any) {
//         logger.error(error);
//         return res.status(500).json({
//             success: false, message: error.message
//         });
//     }
// };

export const createLessonController: RequestHandler<any, any, CreateLessonSchema, any, { lesson: typeof Lesson }> = async (
    req,
    res,
) => {
    try {
        const { lesson, sections } = req.body;
        const courseId = req.params.courseId;

        if (!courseId) return res.status(400).json({ success: false, message: ErrorMessage.Required });

        // Check if the course exists
        const findCourseById = new CourseRepository();
        const course = await findCourseById.findCourseById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: ErrorMessage.CourseId });
        }

        const createLessons = new LessonRepository();
        const existingLesson = await createLessons.findLessonNumber(lesson);
        if (existingLesson) {
            if (existingLesson.courseId === courseId) {
                existingLesson.sections = sections as ISection[];
                await existingLesson.save();
                return res.status(200).json({
                    success: true,
                    message: ResponseMessage.Success,
                    data: existingLesson
                });
            } else {
                const createLesson = await createLessons.createLesson({
                    lesson,
                    sections,
                    courseId: courseId.toString(),
                });

                course.lessons.push(createLesson._id);
                await course.save();
                return res.status(201).json({
                    success: true,
                    message: ResponseMessage.Success,
                    data: {
                        lesson: createLesson.lesson,
                        sections: createLesson.sections,
                        quiz: createLesson.quiz,
                        courseId: createLesson.courseId,
                    }
                });
            }
        } else {
            const createLesson = await createLessons.createLesson({
                lesson,
                sections,
                courseId: courseId.toString(),
            });

            course.lessons.push(createLesson._id);
            await course.save();
            return res.status(201).json({
                success: true,
                message: ResponseMessage.Success,
                data: {
                    lesson: createLesson.lesson,
                    sections: createLesson.sections,
                    quiz: createLesson.quiz,
                    courseId: createLesson.courseId,
                }
            });
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false, message: ErrorMessage.ServerError
        });
    }
};
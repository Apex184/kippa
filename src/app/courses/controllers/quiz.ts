import { RequestHandler } from 'express';
import { CreateQuizSchema } from '../validation';
import { QuizRepository, LessonRepository } from '@/lib/repositories';
import { ErrorMessage, ResponseMessage, logger } from '@/lib';
import { Quiz, Lesson } from '@/lib/models';

export const createQuizController: RequestHandler<any, any, CreateQuizSchema, any, { quiz: typeof Quiz }> = async (
    req,
    res,
) => {
    try {
        const { question, options, correctOption, explanation } = req.body;
        const lessonId = req.params.lessonId;

        if (!lessonId) return res.status(400).json({ success: false, message: ErrorMessage.Required });
        const findLessonById = new LessonRepository();
        const lesson = await findLessonById.findLessonById(lessonId);
        if (!lesson) {
            return res.status(404).json({ success: false, message: ErrorMessage.CourseId });
        }
        const createQuiz = new QuizRepository();
        const findOne = await createQuiz.findQuizByQuestion(question);
        if (findOne) {
            return res.status(400).json({ success: false, message: ErrorMessage.Exists })
        }
        const quiz = await createQuiz.createQuiz({
            lessonId: lessonId.toString(),
            question,
            options,
            correctOption,
            explanation,
        });
        if (!quiz) {
            return res.status(400).json({ success: false, message: ErrorMessage.ServerError });
        }
        return res.status(201).json({
            success: true,
            message: ResponseMessage.Success,
            data: {
                question: quiz.question,
                options: quiz.options,
                correctOption: quiz.correctOption,
                explanation: quiz.explanation,
            }
        });

    } catch (error: any) {
        logger.error(error);
        return res.status(500).json({
            success: false, message: error.message
        });
    }
};
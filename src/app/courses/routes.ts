import { Router } from 'express';
import { createCourseController, createLessonController, createQuizController } from './controllers';
import { validate } from '@/lib/middlewares';
import { CreateCoursesSchema, CreateLessonSchema, CreateQuizSchema } from './validation';

const router = Router();

router.post('/courses', validate(CreateCoursesSchema), createCourseController);
router.post('/courses/:courseId/lessons', validate(CreateLessonSchema), createLessonController);
router.post('/quiz/:lessonId', validate(CreateQuizSchema), createQuizController);

export const courseRoutes = router;
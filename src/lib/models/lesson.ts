import mongoose, { Schema, Document } from 'mongoose';
import { IQuiz } from './quiz';

export interface ISection extends Document {
    title: string;
    content: string;
}

export interface ILesson extends Document {
    lesson: number;
    courseId: string;
    sections: ISection[];
    quiz: IQuiz;
}

const LessonSchema = new Schema<ILesson>({
    courseId: { type: String, ref: 'Course' },
    lesson: { type: Number, required: true },
    sections: [{
        title: { type: String, required: true },
        content: { type: String, required: true }
    }],
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' }
});

export const Lesson = mongoose.model('Lesson', LessonSchema);

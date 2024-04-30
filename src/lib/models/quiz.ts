import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
    lessonId: string;
    question: string;
    options: string[];
    correctOption: number;
    explanation: string;
}


const QuizSchema = new Schema<IQuiz>({
    lessonId: { type: String, ref: 'Lesson' },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctOption: { type: Number, required: true },
    explanation: { type: String, required: true }
});

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);


import mongoose, { Schema, Document } from 'mongoose';
import { ILesson } from './lesson';

export interface ICourse extends Document {
    title: string;
    lessons: ILesson[];
}

const CourseSchema = new Schema<ICourse>({
    title: { type: String, required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }]
});

export const Course = mongoose.model('Course', CourseSchema);

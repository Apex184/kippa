import mongoose, { Schema, Document } from 'mongoose';

export interface ISection extends Document {
    title: string;
    content: string;
}

const SectionSchema = new Schema<ISection>({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

export const Section = mongoose.model<ISection>('Section', SectionSchema);



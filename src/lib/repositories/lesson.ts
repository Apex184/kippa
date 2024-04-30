import { Lesson, ILesson } from '@/lib/models';

import { BaseRepository } from './base';

export class LessonRepository extends BaseRepository<ILesson> {
    constructor() {
        super(Lesson);
    }

    async createLesson(data: Record<string, any>): Promise<ILesson> {
        return this.create(data);
    }

    async findLessonById(id: string): Promise<ILesson | null> {
        return this.findById(id);
    }

    async findLessonNumber(lesson: number): Promise<ILesson | null> {
        return this.findOne({
            lesson,
        });
    }

    async updateLessonById(id: string, data: Record<string, any>): Promise<ILesson | null> {
        return this.updateOne(
            {
                _id: id,
            },
            data,
        );
    }

    async deleteLessonById(id: string): Promise<ILesson | null> {
        return this.deleteOne({
            _id: id,
        });
    }

}
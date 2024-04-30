import { Course, ICourse } from '@/lib/models';

import { BaseRepository } from './base';

export class CourseRepository extends BaseRepository<ICourse> {
    constructor() {
        super(Course);
    }

    async createCourse(data: Record<string, any>): Promise<ICourse> {
        return this.create(data);
    }

    async findCourseById(id: string): Promise<ICourse | null> {
        return this.findById(id);
    }

    async findCourseByTitle(title: string): Promise<ICourse | null> {
        return this.findOne({
            title,
        });
    }

    async updateCourseById(id: string, data: Record<string, any>): Promise<ICourse | null> {
        return this.updateOne(
            {
                _id: id,
            },
            data,
        );
    }

    async deleteCourseById(id: string): Promise<ICourse | null> {
        return this.deleteOne({
            _id: id,
        });
    }

}
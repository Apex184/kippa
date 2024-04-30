import { Document, Model, QueryOptions, Types } from 'mongoose';


export abstract class BaseRepository<T extends Document> {
    constructor(protected model: Model<T>) { }

    async create(data: Record<string, any>): Promise<T> {
        return this.model.create(data);
    }

    async findById(id: string | Types.ObjectId, options?: QueryOptions): Promise<T | null> {
        return this.model.findById(id, null, options).exec();
    }

    async findOne(conditions: Record<string, any>, options?: QueryOptions): Promise<T | null> {
        return this.model.findOne(conditions, null, options).exec();
    }

    async updateOne(conditions: Record<string, any>, update: Record<string, any>, options?: QueryOptions): Promise<T | null> {
        return this.model.findOneAndUpdate(conditions, update, { new: true, ...options }).exec();
    }

    async deleteOne(conditions: Record<string, any>, options?: QueryOptions): Promise<T | null> {
        return this.model.findOneAndDelete(conditions, options).exec();
    }

}

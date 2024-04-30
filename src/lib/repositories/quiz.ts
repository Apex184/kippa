import { Quiz, IQuiz } from '@/lib/models';

import { BaseRepository } from './base';

export class QuizRepository extends BaseRepository<IQuiz> {
    constructor() {
        super(Quiz);
    }

    async createQuiz(data: Record<string, any>): Promise<IQuiz> {
        return this.create(data);
    }

    async findQuizById(id: string): Promise<IQuiz | null> {
        return this.findById(id);
    }

    async findQuizByQuestion(question: string): Promise<IQuiz | null> {
        return this.findOne({
            question,
        });
    }

    async updateQuizById(id: string, data: Record<string, any>): Promise<IQuiz | null> {
        return this.updateOne(
            {
                _id: id,
            },
            data,
        );
    }

    async deleteQuizById(id: string): Promise<IQuiz | null> {
        return this.deleteOne({
            _id: id,
        });
    }
    async findAllQuiz(): Promise<IQuiz[]> {
        return this.model.find();
    }
}
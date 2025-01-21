import { PaginationParams } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details';

export const QUESTIONS_REPOSITORY = Symbol('QuestionsRepository');
export interface QuestionsRepository {
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  findById(questionId: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findDetailsBySlug(slug: string): Promise<QuestionDetails | null>
}

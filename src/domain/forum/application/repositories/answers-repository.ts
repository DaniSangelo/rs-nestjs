import { PaginationParams } from '@/core/repositories/pagination-params'
import { Answer } from '../../enterprise/entities/answer'

export const ANSWERS_REPOSITORY = Symbol('AnswersRepository')
export interface AnswersRepository {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
}

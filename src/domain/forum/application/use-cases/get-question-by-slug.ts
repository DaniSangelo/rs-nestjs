import { Either, left, right } from '@/core/either'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionDetails: QuestionDetails
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const questionDetails =
      await this.questionsRepository.findDetailsBySlug(slug)

    if (!questionDetails) {
      return left(new ResourceNotFoundError())
    }

    return right({ questionDetails })
  }
}

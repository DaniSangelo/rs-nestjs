import { Either, right } from '@/core/either'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )
    return right({ comments })
  }
}

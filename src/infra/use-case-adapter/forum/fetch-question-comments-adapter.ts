import {
  QUESTION_COMMENTS_REPOSITORY,
  QuestionCommentsRepository,
} from '@/domain/forum/application/repositories/question-comments-repository'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class FetchQuestionCommentsUseCaseAdapter extends FetchQuestionCommentsUseCase {
  constructor(
    @Inject(QUESTION_COMMENTS_REPOSITORY)
    questionCommentsRepository: QuestionCommentsRepository,
  ) {
    super(questionCommentsRepository)
  }
}

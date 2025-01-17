import {
  ANSWER_COMMENTS_REPOSITORY,
  AnswerCommentsRepository,
} from '@/domain/forum/application/repositories/answer-comments-repository'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class FetchAnswerCommentsUseCaseAdapter extends FetchAnswerCommentsUseCase {
  constructor(
    @Inject(ANSWER_COMMENTS_REPOSITORY)
    answerCommentsRepository: AnswerCommentsRepository,
  ) {
    super(answerCommentsRepository)
  }
}

import {
  ANSWER_COMMENTS_REPOSITORY,
  AnswerCommentsRepository,
} from '@/domain/forum/application/repositories/answer-comments-repository'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteAnswerCommentUseCaseAdapter extends DeleteAnswerCommentUseCase {
  constructor(
    @Inject(ANSWER_COMMENTS_REPOSITORY)
    answerCommentsRepository: AnswerCommentsRepository,
  ) {
    super(answerCommentsRepository)
  }
}

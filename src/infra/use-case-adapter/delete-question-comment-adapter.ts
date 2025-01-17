import {
  QUESTION_COMMENTS_REPOSITORY,
  QuestionCommentsRepository,
} from '@/domain/forum/application/repositories/question-comments-repository'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteQuestionCommentUseCaseAdapter extends DeleteQuestionCommentUseCase {
  constructor(
    @Inject(QUESTION_COMMENTS_REPOSITORY)
    questionCommentsRepository: QuestionCommentsRepository,
  ) {
    super(questionCommentsRepository)
  }
}

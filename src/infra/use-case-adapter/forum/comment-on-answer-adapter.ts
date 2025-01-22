import {
  ANSWER_COMMENTS_REPOSITORY,
  AnswerCommentsRepository,
} from '@/domain/forum/application/repositories/answer-comments-repository'
import {
  ANSWERS_REPOSITORY,
  AnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CommentOnAnswerUseCaseAdapter extends CommentOnAnswerUseCase {
  constructor(
    @Inject(ANSWERS_REPOSITORY)
    answersRepository: AnswersRepository,
    @Inject(ANSWER_COMMENTS_REPOSITORY)
    answerComments: AnswerCommentsRepository,
  ) {
    super(answersRepository, answerComments)
  }
}

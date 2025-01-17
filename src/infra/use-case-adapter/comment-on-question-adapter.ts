import {
  QUESTION_COMMENTS_REPOSITORY,
  QuestionCommentsRepository,
} from '@/domain/forum/application/repositories/question-comments-repository'
import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CommentOnQuestionUseCaseAdapter extends CommentOnQuestionUseCase {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    questionsRepository: QuestionsRepository,
    @Inject(QUESTION_COMMENTS_REPOSITORY)
    questionCommentsRepository: QuestionCommentsRepository,
  ) {
    super(questionsRepository, questionCommentsRepository)
  }
}

import {
  ANSWERS_REPOSITORY,
  AnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository'
import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ChooseQuestionBestAnswerUseCaseAdapter extends ChooseQuestionBestAnswerUseCase {
  constructor(
    @Inject(ANSWERS_REPOSITORY)
    answersRepository: AnswersRepository,
    @Inject(QUESTIONS_REPOSITORY)
    questionsRepository: QuestionsRepository,
  ) {
    super(answersRepository, questionsRepository)
  }
}

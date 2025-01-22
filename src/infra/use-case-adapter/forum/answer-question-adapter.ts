import {
  ANSWERS_REPOSITORY,
  AnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AnswerQuestionUseCaseAdapter extends AnswerQuestionUseCase {
  constructor(
    @Inject(ANSWERS_REPOSITORY)
    answersRepository: AnswersRepository,
  ) {
    super(answersRepository)
  }
}

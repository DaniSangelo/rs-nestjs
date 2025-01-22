import {
  ANSWERS_REPOSITORY,
  AnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class FetchQuestionAnswersUseCaseAdapter extends FetchQuestionAnswersUseCase {
  constructor(
    @Inject(ANSWERS_REPOSITORY)
    answersRepository: AnswersRepository,
  ) {
    super(answersRepository)
  }
}

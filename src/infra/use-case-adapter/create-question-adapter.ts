import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateQuestionUseCaseAdapter extends CreateQuestionUseCase {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    questionRepository: QuestionsRepository,
  ) {
    super(questionRepository)
  }
}

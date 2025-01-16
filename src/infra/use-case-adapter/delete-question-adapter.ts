import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteQuestionUseCaseAdapter extends DeleteQuestionUseCase {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    questionsRepository: QuestionsRepository,
  ) {
    super(questionsRepository)
  }
}

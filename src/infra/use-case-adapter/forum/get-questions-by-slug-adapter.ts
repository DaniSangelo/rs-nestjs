import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetQuestionsBySlugUseCaseAdapter extends GetQuestionBySlugUseCase {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    questionsRepository: QuestionsRepository,
  ) {
    super(questionsRepository)
  }
}

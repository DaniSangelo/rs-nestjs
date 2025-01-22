import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class FetchRecentQuestionsUseCaseAdapter extends FetchRecentQuestionsUseCase {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    questionRepository: QuestionsRepository,
  ) {
    super(questionRepository)
  }
}

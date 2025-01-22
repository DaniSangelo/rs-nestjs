import {
  ANSWERS_REPOSITORY,
  AnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteAnswerUseCaseAdapter extends DeleteAnswerUseCase {
  constructor(
    @Inject(ANSWERS_REPOSITORY)
    answersRepository: AnswersRepository,
  ) {
    super(answersRepository)
  }
}

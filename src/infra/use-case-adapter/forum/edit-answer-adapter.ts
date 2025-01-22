import {
  ANSWER_ATTACHMENTS_REPOSITORY,
  AnswerAttachmentsRepository,
} from '@/domain/forum/application/repositories/answer-attachments-repository'
import {
  ANSWERS_REPOSITORY,
  AnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class EditAnswerUseCaseAdapter extends EditAnswerUseCase {
  constructor(
    @Inject(ANSWERS_REPOSITORY)
    answersRepository: AnswersRepository,
    @Inject(ANSWER_ATTACHMENTS_REPOSITORY)
    answersAttachmentsRepository: AnswerAttachmentsRepository,
  ) {
    super(answersRepository, answersAttachmentsRepository)
  }
}

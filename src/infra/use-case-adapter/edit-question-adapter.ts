import {
  QuestionAttachmentsRepository,
  QUESTIONS_ATTACHMENT_REPOSITORY,
} from '@/domain/forum/application/repositories/question-attachments-repository'
import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class EditQuestionUseCaseAdapter extends EditQuestionUseCase {
  constructor(
    @Inject(QUESTIONS_REPOSITORY)
    questionsRepository: QuestionsRepository,
    @Inject(QUESTIONS_ATTACHMENT_REPOSITORY)
    questionAttachmentRepository: QuestionAttachmentsRepository,
  ) {
    super(questionsRepository, questionAttachmentRepository)
  }
}

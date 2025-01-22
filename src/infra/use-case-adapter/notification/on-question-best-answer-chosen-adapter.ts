import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/application/use-case/send-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnQuestionBestAnswerChosenAdapter extends OnQuestionBestAnswerChosen {
  constructor(
    answersRepository: AnswersRepository,
    sendNotification: SendNotificationUseCase,
  ) {
    super(answersRepository, sendNotification)
  }
}

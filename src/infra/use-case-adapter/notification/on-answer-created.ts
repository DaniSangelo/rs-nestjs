import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'
import { SendNotificationUseCase } from '@/domain/notification/application/use-case/send-notification'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnAnswerCreatedAdapter extends OnAnswerCreated {
  constructor(
    questionsRepository: QuestionsRepository,
    sendNotification: SendNotificationUseCase,
  ) {
    super(questionsRepository, sendNotification)
  }
}

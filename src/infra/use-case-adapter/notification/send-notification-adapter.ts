import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { SendNotificationUseCase } from '@/domain/notification/application/use-case/send-notification'
import { Injectable } from '@nestjs/common'

export const SEND_NOTIFICATION = Symbol('OnAnswerCreated')

@Injectable()
export class SendNotificationUseCaseAdapter extends SendNotificationUseCase {
  constructor(notificationsRepository: NotificationsRepository) {
    super(notificationsRepository)
  }
}

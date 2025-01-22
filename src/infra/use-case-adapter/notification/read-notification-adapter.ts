import {
  NOTIFICATIONS_REPOSITORY,
  NotificationsRepository,
} from '@/domain/notification/application/repositories/notifications-repository'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-case/read-notification'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ReadNotificationUseCaseAdapter extends ReadNotificationUseCase {
  constructor(
    @Inject(NOTIFICATIONS_REPOSITORY)
    notificationsRepository: NotificationsRepository,
  ) {
    super(notificationsRepository)
  }
}

import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { ReadNotificationUseCaseAdapter } from '@/infra/use-case-adapter/notification/read-notification-adapter'
import { Controller, HttpCode, Param, Patch } from '@nestjs/common'

@Controller('/notifications/:notificationId/read')
export class ReadNotificationController {
  constructor(private readNotification: ReadNotificationUseCaseAdapter) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { sub: recipientId } = user

    await this.readNotification.execute({
      notificationId,
      recipientId,
    })
  }
}

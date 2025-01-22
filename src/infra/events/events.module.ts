import { Module } from '@nestjs/common'
import { SendNotificationUseCaseAdapter } from '../use-case-adapter/notification/send-notification-adapter'
import { OnAnswerCreatedAdapter } from '../use-case-adapter/notification/on-answer-created'
import { DatabaseModule } from '../database/database.module'
import { PrismaQuestionsRepository } from '../database/prisma/repositories/prisma-questions-repository'
import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import {
  NOTIFICATIONS_REPOSITORY,
  NotificationsRepository,
} from '@/domain/notification/application/repositories/notifications-repository'
import { OnQuestionBestAnswerChosenAdapter } from '../use-case-adapter/notification/on-question-best-answer-chosen-adapter'
import {
  ANSWERS_REPOSITORY,
  AnswersRepository,
} from '@/domain/forum/application/repositories/answers-repository'
import { ReadNotificationUseCaseAdapter } from '../use-case-adapter/notification/read-notification-adapter'

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: OnAnswerCreatedAdapter,
      useFactory: (
        questionsRepository: QuestionsRepository,
        sendNotification: SendNotificationUseCaseAdapter,
      ) => {
        return new OnAnswerCreatedAdapter(questionsRepository, sendNotification)
      },
      inject: [QUESTIONS_REPOSITORY, SendNotificationUseCaseAdapter],
    },
    {
      provide: QUESTIONS_REPOSITORY,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: SendNotificationUseCaseAdapter,
      useFactory: (notificationsRepository: NotificationsRepository) => {
        return new SendNotificationUseCaseAdapter(notificationsRepository)
      },
      inject: [NOTIFICATIONS_REPOSITORY],
    },
    {
      provide: OnQuestionBestAnswerChosenAdapter,
      useFactory: (
        answersRepository: AnswersRepository,
        sendNotification: SendNotificationUseCaseAdapter,
      ) => {
        return new OnQuestionBestAnswerChosenAdapter(
          answersRepository,
          sendNotification,
        )
      },
      inject: [ANSWERS_REPOSITORY, SendNotificationUseCaseAdapter],
    },
    {
      provide: ReadNotificationUseCaseAdapter,
      useFactory: (notificationsRepository: NotificationsRepository) => {
        return new ReadNotificationUseCaseAdapter(notificationsRepository)
      },
      inject: [NOTIFICATIONS_REPOSITORY],
    },
  ],
})
export class EventsModule {}

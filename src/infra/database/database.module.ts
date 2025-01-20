import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-comments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { QUESTIONS_REPOSITORY } from '@/domain/forum/application/repositories/questions-repository'
import { STUDENTS_REPOSITORY } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'
import { QUESTIONS_ATTACHMENT_REPOSITORY } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QUESTION_COMMENTS_REPOSITORY } from '@/domain/forum/application/repositories/question-comments-repository'
import { ANSWERS_REPOSITORY } from '@/domain/forum/application/repositories/answers-repository'
import { ANSWER_COMMENTS_REPOSITORY } from '@/domain/forum/application/repositories/answer-comments-repository'
import { ANSWER_ATTACHMENTS_REPOSITORY } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { ATTACHMENTS_REPOSITORY } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments-repository'

@Module({
  providers: [
    PrismaService,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswerAttachmentsRepository,
    {
      provide: ANSWER_COMMENTS_REPOSITORY,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: QUESTION_COMMENTS_REPOSITORY,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: STUDENTS_REPOSITORY,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: ANSWER_ATTACHMENTS_REPOSITORY,
      useFactory: (
        prismaService: PrismaService,
        answerAttachmentsRepository: PrismaAnswerAttachmentsRepository,
      ) => {
        return new PrismaAnswersRepository(
          prismaService,
          answerAttachmentsRepository,
        )
      },
      inject: [PrismaService, PrismaAnswerAttachmentsRepository],
    },
    {
      provide: ANSWERS_REPOSITORY,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: QUESTIONS_ATTACHMENT_REPOSITORY,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: QUESTIONS_REPOSITORY,
      useFactory: (
        prismaService: PrismaService,
        questionAttachmentsRepository: PrismaQuestionAttachmentsRepository,
      ) => {
        return new PrismaQuestionsRepository(
          prismaService,
          questionAttachmentsRepository,
        )
      },
      inject: [PrismaService, PrismaQuestionAttachmentsRepository],
    },
    {
      provide: ATTACHMENTS_REPOSITORY,
      useClass: PrismaAttachmentsRepository
    }
  ],
  exports: [
    PrismaService,
    ANSWER_COMMENTS_REPOSITORY,
    QUESTION_COMMENTS_REPOSITORY,
    STUDENTS_REPOSITORY,
    ANSWER_ATTACHMENTS_REPOSITORY,
    ANSWERS_REPOSITORY,
    QUESTIONS_ATTACHMENT_REPOSITORY,
    QUESTIONS_REPOSITORY,
    ATTACHMENTS_REPOSITORY,
  ],
})
export class DatabaseModule {}

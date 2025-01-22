import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/infra/app.module'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment'
import {
  CACHE_REPOSITORY,
  CacheRepository,
} from '@/infra/cache/cache-repository'
import {
  QUESTIONS_REPOSITORY,
  QuestionsRepository,
} from '@/domain/forum/application/repositories/questions-repository'
import { PrismaQuestionsRepository } from './prisma-questions-repository'
import { RedisCacheRepository } from '@/infra/cache/redis/redis-cache-repository'
import { EventsModule } from '@/infra/events/events.module'
import { CacheModule } from '@/infra/cache/cache.module'

describe('Prisma questions repository (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let cacheRepository: CacheRepository
  let questionsRepository: QuestionsRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
        {
          provide: QUESTIONS_REPOSITORY,
          useClass: PrismaQuestionsRepository,
        },
        {
          provide: CACHE_REPOSITORY,
          useClass: RedisCacheRepository,
        },
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    questionsRepository = moduleRef.get(QUESTIONS_REPOSITORY)
    cacheRepository = moduleRef.get(CACHE_REPOSITORY)

    await app.init()
  })

  it('should cache question details', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'Daniel',
      email: 'daniel@mail.com',
      password: '123456',
    })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment({})

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      questionId: question.id,
      attachmentId: attachment.id,
    })

    const slug = question.slug.value
    const questionDetails = await questionsRepository.findDetailsBySlug(slug)
    const cached = await cacheRepository.get(`question:${slug}:details`)
    expect(cached).toEqual(JSON.stringify(questionDetails))
  })
})

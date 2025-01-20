import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment'
import { StudentFactory } from 'test/factories/make-student'

describe('Edit question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwtService: JwtService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwtService = moduleRef.get(JwtService)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)

    await app.init()
  })

  test('[PUT] /questions/:id', async () => {
    const user = await studentFactory.makePrismaStudent({
      email: 'daniel2@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const response = await request(app.getHttpServer())
      .put(`/questions/${question.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New',
        content: 'New content',
      })

    expect(response.statusCode).toBe(204)

    const questionInDatabase = await prisma.question.findFirst({
      where: {
        title: 'New',
        content: 'New content',
      },
    })
    expect(questionInDatabase).toBeTruthy()
  })

  test('[PUT] /questions/:id with attachments', async () => {
    const user = await studentFactory.makePrismaStudent({
      email: 'daniel32@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
      title: 'mark I',
      slug: Slug.create('mark-i'),
    })

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment1.id,
      questionId: question.id,
    })

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment2.id,
      questionId: question.id,
    })

    const attachment3 = await attachmentFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .put(`/questions/${question.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'New title',
        content: 'New content 2',
        attachments: [attachment1.id.toString(), attachment3.id.toString()],
      })

    expect(response.statusCode).toBe(204)

    const questionInDatabase = await prisma.question.findFirst({
      where: {
        title: 'New title',
        content: 'New content 2',
      },
    })
    expect(questionInDatabase).toBeTruthy()
    const attachmentsOnDb = await prisma.attachment.findMany({
      where: {
        questionId: questionInDatabase?.id,
      },
    })

    expect(attachmentsOnDb).toHaveLength(2)
  })
})

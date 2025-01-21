import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import request from 'supertest'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { AttachmentFactory } from 'test/factories/make-attachment'

describe.skip('Create answer E2E', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let jwtService: JwtService
  let prisma: PrismaService
  let attachmentFactory: AttachmentFactory

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        JwtService,
        AttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    prisma = moduleRef.get(PrismaService)
    jwtService = moduleRef.get(JwtService)
    attachmentFactory = moduleRef.get(AttachmentFactory)

    await app.init()
  })

  test('[POST] /questions/:questionId/answers', async () => {
    const user = await studentFactory.makePrismaStudent()
    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'This is a new answer',
      })

    expect(response.statusCode).toBe(201)
    const answerInDb = await prisma.answer.findFirst({
      where: {
        content: 'This is a new answer',
      },
    })
    expect(answerInDb).toBeTruthy()
  })

  test('[POST] /questions/:questionId/answers with attachments', async () => {
    const user = await studentFactory.makePrismaStudent({
      email: 'daniel221@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const questionId = question.id.toString()

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .post(`/questions/${questionId}/answers`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        content: 'Lorem ipsum',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

    expect(response.statusCode).toBe(201)
    const answerInDb = await prisma.answer.findFirst({
      where: {
        content: 'Lorem ipsum',
      },
    })

    expect(answerInDb).toBeTruthy()

    const attachmentsInDb = await prisma.attachment.findMany({
      where: {
        answerId: answerInDb?.id,
      },
    })

    expect(attachmentsInDb).toHaveLength(2)
  })
})

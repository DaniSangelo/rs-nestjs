import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { StudentFactory } from 'test/factories/make-student'

describe('Create question (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwtService: JwtService
  let studentFactory: StudentFactory
  let attachmentFactory: AttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, AttachmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    studentFactory = moduleRef.get(StudentFactory)
    jwtService = moduleRef.get(JwtService)
    attachmentFactory = moduleRef.get(AttachmentFactory)

    await app.init()
  })

  test('[POST] /questions', async () => {
    const user = await studentFactory.makePrismaStudent({
      email: 'daniel2@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Question One',
        content: 'Lorem ipsum',
      })

    expect(response.statusCode).toBe(201)
    const questionIsInDB = await prisma.question.findFirst({
      where: {
        title: 'Question One',
      },
    })

    expect(questionIsInDB).toBeTruthy()
  })

  test('[POST] /questions with attachments', async () => {
    const user = await studentFactory.makePrismaStudent({
      email: 'daniel22@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const attachment1 = await attachmentFactory.makePrismaAttachment()
    const attachment2 = await attachmentFactory.makePrismaAttachment()

    const response = await request(app.getHttpServer())
      .post('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Question Two',
        content: 'Lorem ipsum',
        attachments: [attachment1.id.toString(), attachment2.id.toString()],
      })

    expect(response.statusCode).toBe(201)
    const questionIsInDB = await prisma.question.findFirst({
      where: {
        title: 'Question Two',
      },
    })

    expect(questionIsInDB).toBeTruthy()

    const attachmentsOnDb = await prisma.attachment.findMany({
      where: {
        questionId: questionIsInDB?.id,
      },
    })

    expect(attachmentsOnDb).toHaveLength(2)
  })
})

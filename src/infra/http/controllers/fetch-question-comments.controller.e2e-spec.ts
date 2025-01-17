import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'
import request from 'supertest'
import { QuestionCommentFactory } from 'test/factories/make-question-comment'

describe('Fetch question comments E2E', () => {
  let app: INestApplication
  let questionFactory: QuestionFactory
  let questionCommentFactory: QuestionCommentFactory
  let studentFactory: StudentFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [QuestionCommentFactory, QuestionFactory, StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    questionFactory = moduleRef.get(QuestionFactory)
    questionCommentFactory = moduleRef.get(QuestionCommentFactory)
    studentFactory = moduleRef.get(StudentFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions/:questionId/comments', async () => {
    const user = await studentFactory.makePrismaStudent()
    const accessToken = jwt.sign({ sub: user.id.toString() })
    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })
    await Promise.all([
      questionCommentFactory.makePrimsaQuestionComment({
        authorId: user.id,
        questionId: question.id,
      }),
      questionCommentFactory.makePrimsaQuestionComment({
        authorId: user.id,
        questionId: question.id,
      }),
      questionCommentFactory.makePrimsaQuestionComment({
        authorId: user.id,
        questionId: question.id,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/questions/${question.id.toString()}/comments`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        page: 1,
      })

    expect(response.statusCode).toBe(200)
  })
})

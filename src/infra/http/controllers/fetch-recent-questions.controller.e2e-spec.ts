import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppModule } from '@/infra/app.module'
import { StudentFactory } from 'test/factories/make-student'
import { QuestionFactory } from 'test/factories/make-question'
import { DatabaseModule } from '@/infra/database/database.module'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

describe.skip('Fetch recent question (E2E)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, QuestionFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    jwtService = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /questions', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'Daniel',
      email: 'daniel@mail.com',
      password: '123456',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    await Promise.all([
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: `Lorem ipsum 1`,
        slug: Slug.create(`lorem-ipsum-1`),
      }),
      questionFactory.makePrismaQuestion({
        authorId: user.id,
        title: `Lorem ipsum 2`,
        slug: Slug.create(`lorem-ipsum-2`),
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      questions: expect.arrayContaining([
        expect.objectContaining({ title: 'Lorem ipsum 1' }),
        expect.objectContaining({ title: 'Lorem ipsum 2' }),
      ]),
    })
  })
})

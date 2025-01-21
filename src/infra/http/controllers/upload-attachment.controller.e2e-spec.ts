import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppModule } from '@/infra/app.module'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Upload attachments (E2E)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    jwtService = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /attachments', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'Daniel',
      email: 'daniel@mail.com',
      password: '123456',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/attachments')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/reivendell.png')

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      attachmentId: expect.any(String),
    })
  })
})

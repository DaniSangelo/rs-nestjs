import { AppModule } from '@/infra/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Authenticate user (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /sessions', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      email: 'daniel@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    expect(response.statusCode).toBe(201)

    const authenticatedUser = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'daniel@mail.com',
        password: '123456',
      })

    expect(authenticatedUser.statusCode).toBe(200)
    expect(authenticatedUser.body).toEqual({
      access_token: expect.any(String),
    })
  })
})

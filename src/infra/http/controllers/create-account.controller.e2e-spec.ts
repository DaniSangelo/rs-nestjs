import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe.skip('Create account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      email: 'daniel@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    expect(response.statusCode).toBe(201)

    const wasAccountCreated = await prisma.user.findUnique({
      where: {
        email: 'daniel@mail.com',
      },
    })

    expect(wasAccountCreated).toBeTruthy()
  })

  test('[POST] /sessions', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      email: 'daniel2@mail.com',
      password: '123456',
      name: 'Daniel',
    })

    expect(response.statusCode).toBe(201)

    const authenticatedUser = await request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'daniel2@mail.com',
        password: '123456',
      })

    expect(authenticatedUser.statusCode).toBe(200)
    expect(authenticatedUser.body).toEqual({
      access_token: expect.any(String),
    })
  })
})

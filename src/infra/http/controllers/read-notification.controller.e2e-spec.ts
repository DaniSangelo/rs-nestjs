import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AppModule } from '@/infra/app.module'
import { StudentFactory } from 'test/factories/make-student'
import { DatabaseModule } from '@/infra/database/database.module'
import { QuestionFactory } from 'test/factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { NotificationFactory } from 'test/factories/make-notification'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Read notification (E2E)', () => {
  let app: INestApplication
  let jwtService: JwtService
  let studentFactory: StudentFactory
  let prisma: PrismaService
  let notificationFactory: NotificationFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        NotificationFactory,
        PrismaService,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    prisma = moduleRef.get(PrismaService)
    jwtService = moduleRef.get(JwtService)
    notificationFactory = moduleRef.get(NotificationFactory)

    await app.init()
  })

  it('should read a notification', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'Daniel',
      email: 'daniel@mail.com',
      password: '123456',
    })

    const accessToken = jwtService.sign({ sub: user.id.toString() })

    const notification = await notificationFactory.makePrismaNotification({
      recipientId: user.id,
    })

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notification.id.toString()}/read`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)
    const notificationOnDb = await prisma.notification.findFirst({
      where: {
        recipientId: user.id.toString(),
      },
    })

    expect(notificationOnDb).not.toBeNull()
  })
})

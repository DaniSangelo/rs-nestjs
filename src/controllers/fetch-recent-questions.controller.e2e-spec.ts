import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '@/app.module'
import { PrismaService } from '@/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Fetch recent question (E2E)', () => {
    let app: INestApplication
    let prisma: PrismaService
    let jwtService: JwtService

    beforeAll(async () => {

        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)
        jwtService = moduleRef.get(JwtService)

        await app.init()
    })

    test('[GET] /questions', async () => {
        const user = await prisma.user.create({
            data: {
                name: 'Daniel',
                email: 'daniel@mail.com',
                password: '123456'
            }
        })

        const accessToken = jwtService.sign({ sub: user.id })

        await prisma.question.createMany({
            data: [
                {
                    authorId: user.id,
                    content: 'Lorem ipsum 1',
                    title: 'Lorem ipsum q1',
                    slug: 'lorem-ipsum-q1'
                },
                {
                    authorId: user.id,
                    content: 'Lorem ipsum 2',
                    title: 'Lorem ipsum q2',
                    slug: 'lorem-ipsum-q2'
                }
            ]
        })

        const response = await request(app.getHttpServer())
            .get('/questions')
            .set('Authorization', `Bearer ${accessToken}`)
            .send();
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            questions: [
                expect.objectContaining({ title: 'Lorem ipsum q1'}),
                expect.objectContaining({ title: 'Lorem ipsum q2'})
            ]
        })
    })
})
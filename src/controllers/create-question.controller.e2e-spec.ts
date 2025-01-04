import { AppModule } from "@/app.module"
import { PrismaService } from "@/prisma/prisma.service"
import { INestApplication } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import request from 'supertest'

describe('Create question (E2E)', () => {
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

    test('[POST] /questions', async () => {
        const user = await prisma.user.create({
            data: {
                email: 'daniel2@mail.com',
                password: '123456',
                name: 'Daniel'
            }
        })

        const accessToken = jwtService.sign({ sub: user.id })

        const response = await request(app.getHttpServer())
            .post('/questions')
            .set('Authorization', `Bearer ${accessToken}`)
            .send({
                title: 'Question One',
                content: 'Lorem ipsum'
            })

        expect(response.statusCode).toBe(201)
        const questionIsInDB = await prisma.question.findFirst({
            where: {
                title: 'Question One'
            }
        })

        expect(questionIsInDB).toBeTruthy()
    })
})
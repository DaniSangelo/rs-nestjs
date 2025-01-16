import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthController } from './controllers/auth.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCaseAdapter } from '../use-case-adapter/create-question-adapter'
import { FetchRecentQuestionsUseCaseAdapter } from '../use-case-adapter/fetch-recent-questions-adapter'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CryptographyModule } from '../cryptography/cryptograpy.module'
import { PrismaService } from '../database/prisma/prisma.service'
import { GetQuestionsBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionsBySlugUseCaseAdapter } from '../use-case-adapter/get-questions-by-slug-adapter'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionsBySlugController,
  ],
  providers: [
    PrismaService,
    CreateQuestionUseCaseAdapter,
    FetchRecentQuestionsUseCaseAdapter,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionsBySlugUseCaseAdapter,
  ],
})
export class HttpModule {}

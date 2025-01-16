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
import { EditQuestionController } from './controllers/edit-question.controller'
import { EditQuestionUseCaseAdapter } from '../use-case-adapter/edit-question-adapter'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCaseAdapter } from '../use-case-adapter/delete-question-adapter'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionsBySlugController,
    EditQuestionController,
    DeleteQuestionController,
  ],
  providers: [
    PrismaService,
    CreateQuestionUseCaseAdapter,
    FetchRecentQuestionsUseCaseAdapter,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionsBySlugUseCaseAdapter,
    EditQuestionUseCaseAdapter,
    DeleteQuestionUseCaseAdapter,
  ],
})
export class HttpModule {}

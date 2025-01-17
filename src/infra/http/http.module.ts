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
import { CreateAnswerController } from './controllers/create-answer.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { EditAnswerUseCaseAdapter } from '../use-case-adapter/edit-answer-adapter'
import { DeleteAnswerUseCaseAdapter } from '../use-case-adapter/delete-answer-adapter'
import { AnswerQuestionUseCaseAdapter } from '../use-case-adapter/answer-question-adapter'
import { FetchQuestionAnswersUseCaseAdapter } from '../use-case-adapter/fetch-question-answers-adapter'

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
    CreateAnswerController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
  ],
  providers: [
    PrismaService,
    CreateQuestionUseCaseAdapter,
    FetchRecentQuestionsUseCaseAdapter,
    GetQuestionsBySlugUseCaseAdapter,
    EditQuestionUseCaseAdapter,
    DeleteQuestionUseCaseAdapter,
    AnswerQuestionUseCaseAdapter,
    EditAnswerUseCaseAdapter,
    DeleteAnswerUseCaseAdapter,
    FetchQuestionAnswersUseCaseAdapter,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
  ],
})
export class HttpModule {}

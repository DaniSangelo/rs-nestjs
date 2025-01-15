import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthController } from './controllers/auth.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCaseAdapter } from '../use-case-adapter/create-question-use-case-adapter'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [CreateQuestionUseCaseAdapter],
})
export class HttpModule {}

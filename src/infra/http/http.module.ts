import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthController } from './controllers/auth.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCaseAdapter } from '../use-case-adapter/create-question-adapter'
import { FetchRecentQuestionsUseCaseAdapter } from '../use-case-adapter/fetch-recent-questions-adapter'
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
import { RegisterStudentUseCaseAdapter } from '../use-case-adapter/register-student-adapter'
import { AuthenticateStudentUseCaseAdapter } from '../use-case-adapter/authenticate-student-adapter'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUseCaseAdapter } from '../use-case-adapter/choose-question-best-answer-adapter'
import { CommentOnQuestionUseCaseAdapter } from '../use-case-adapter/comment-on-question-adapter'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { DeleteQuestionCommentUseCaseAdapter } from '../use-case-adapter/delete-question-comment-adapter'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { CommentOnAnswerUseCaseAdapter } from '../use-case-adapter/comment-on-answer-adapter'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerCommentUseCaseAdapter } from '../use-case-adapter/delete-answer-comment-adapter'
import { FetchQuestionCommentsUseCaseAdapter } from '../use-case-adapter/fetch-question-comments-adapter'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'

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
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController
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
    RegisterStudentUseCaseAdapter,
    AuthenticateStudentUseCaseAdapter,
    ChooseQuestionBestAnswerUseCaseAdapter,
    CommentOnQuestionUseCaseAdapter,
    DeleteQuestionCommentUseCaseAdapter,
    CommentOnAnswerUseCaseAdapter,
    DeleteAnswerCommentUseCaseAdapter,
    FetchQuestionCommentsUseCaseAdapter
  ],
})
export class HttpModule {}

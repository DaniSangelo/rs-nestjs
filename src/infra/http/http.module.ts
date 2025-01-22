import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthController } from './controllers/auth.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCaseAdapter } from '../use-case-adapter/forum/create-question-adapter'
import { FetchRecentQuestionsUseCaseAdapter } from '../use-case-adapter/forum/fetch-recent-questions-adapter'
import { CryptographyModule } from '../cryptography/cryptograpy.module'
import { PrismaService } from '../database/prisma/prisma.service'
import { GetQuestionsBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionsBySlugUseCaseAdapter } from '../use-case-adapter/forum/get-questions-by-slug-adapter'
import { EditQuestionController } from './controllers/edit-question.controller'
import { EditQuestionUseCaseAdapter } from '../use-case-adapter/forum/edit-question-adapter'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCaseAdapter } from '../use-case-adapter/forum/delete-question-adapter'
import { CreateAnswerController } from './controllers/create-answer.controller'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { EditAnswerUseCaseAdapter } from '../use-case-adapter/forum/edit-answer-adapter'
import { DeleteAnswerUseCaseAdapter } from '../use-case-adapter/forum/delete-answer-adapter'
import { AnswerQuestionUseCaseAdapter } from '../use-case-adapter/forum/answer-question-adapter'
import { FetchQuestionAnswersUseCaseAdapter } from '../use-case-adapter/forum/fetch-question-answers-adapter'
import { RegisterStudentUseCaseAdapter } from '../use-case-adapter/forum/register-student-adapter'
import { AuthenticateStudentUseCaseAdapter } from '../use-case-adapter/forum/authenticate-student-adapter'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUseCaseAdapter } from '../use-case-adapter/forum/choose-question-best-answer-adapter'
import { CommentOnQuestionUseCaseAdapter } from '../use-case-adapter/forum/comment-on-question-adapter'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { DeleteQuestionCommentUseCaseAdapter } from '../use-case-adapter/forum/delete-question-comment-adapter'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { CommentOnAnswerUseCaseAdapter } from '../use-case-adapter/forum/comment-on-answer-adapter'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerCommentUseCaseAdapter } from '../use-case-adapter/forum/delete-answer-comment-adapter'
import { FetchQuestionCommentsUseCaseAdapter } from '../use-case-adapter/forum/fetch-question-comments-adapter'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'
import { FetchAnswerCommentsUseCaseAdapter } from '../use-case-adapter/forum/fetch-answer-comments-adapter'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { StorageModule } from '../storage/storage.module'
import { UploadAndCreateAttachmentUseCaseAdapter } from '../use-case-adapter/forum/upload-and-create-attachment-adapter'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
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
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
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
    FetchQuestionCommentsUseCaseAdapter,
    FetchAnswerCommentsUseCaseAdapter,
    UploadAndCreateAttachmentUseCaseAdapter,
  ],
})
export class HttpModule {}

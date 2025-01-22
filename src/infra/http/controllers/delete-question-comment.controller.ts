import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { DeleteQuestionCommentUseCaseAdapter } from '@/infra/use-case-adapter/forum/delete-question-comment-adapter'
import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

@Controller('/questions/comments/:id')
export class DeleteQuestionCommentController {
  constructor(
    private deleteQuestionComments: DeleteQuestionCommentUseCaseAdapter,
  ) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Param('id') questionCommentId: string,
  ) {
    await this.deleteQuestionComments.execute({
      questionCommentId,
      authorId: user.sub,
    })
  }
}

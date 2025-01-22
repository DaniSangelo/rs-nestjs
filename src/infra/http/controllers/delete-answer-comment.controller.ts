import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { DeleteAnswerCommentUseCaseAdapter } from '@/infra/use-case-adapter/forum/delete-answer-comment-adapter'
import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(
    private deleteAnswerComments: DeleteAnswerCommentUseCaseAdapter,
  ) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Param('id') answerCommentId: string,
  ) {
    await this.deleteAnswerComments.execute({
      answerCommentId,
      authorId: user.sub,
    })
  }
}

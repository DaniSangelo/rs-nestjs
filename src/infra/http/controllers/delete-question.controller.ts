import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { DeleteQuestionUseCaseAdapter } from '@/infra/use-case-adapter/forum/delete-question-adapter'
import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

@Controller('/questions/:id')
export class DeleteQuestionController {
  constructor(
    private deleteQuestionUseCaseAdapter: DeleteQuestionUseCaseAdapter,
  ) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @Param('id') id: string,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const userId = user.sub

    return this.deleteQuestionUseCaseAdapter.execute({
      questionId: id,
      authorId: userId,
    })
  }
}

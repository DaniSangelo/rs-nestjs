import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { DeleteAnswerUseCaseAdapter } from '@/infra/use-case-adapter/forum/delete-answer-adapter'
import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswerUseCase: DeleteAnswerUseCaseAdapter) {}

  @Delete()
  @HttpCode(200)
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub

    await this.deleteAnswerUseCase.execute({
      answerId,
      authorId: userId,
    })
  }
}

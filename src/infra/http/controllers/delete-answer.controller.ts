import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { Controller, Delete, HttpCode, Param } from '@nestjs/common'

@Controller('/answers/:id')
export class DeleteAnswerController {
  constructor(private deleteAnswerUseCase: DeleteAnswerUseCase) {}

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

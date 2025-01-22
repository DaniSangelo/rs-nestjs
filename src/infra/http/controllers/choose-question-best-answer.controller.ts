import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { ChooseQuestionBestAnswerUseCaseAdapter } from '@/infra/use-case-adapter/forum/choose-question-best-answer-adapter'
import { Controller, HttpCode, Param, Patch } from '@nestjs/common'

@Controller('/answers/:answerId/choose-as-best')
export class ChooseQuestionBestAnswerController {
  constructor(
    private chooseQuestionBestAnswerUseCaseAdapter: ChooseQuestionBestAnswerUseCaseAdapter,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Param('answerId') answerId: string,
  ) {
    await this.chooseQuestionBestAnswerUseCaseAdapter.execute({
      answerId,
      authorId: user.sub,
    })
    return ''
  }
}

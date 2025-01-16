import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'

const editAnswerBodySchema = z.object({
  content: z.string(),
})
type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswerUseCase: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Param('id') answerId: string,
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
  ) {
    const userId = user.sub

    await this.editAnswerUseCase.execute({
      authorId: userId,
      content: body.content,
      answerId,
      attachmentsIds: [],
    })
  }
}

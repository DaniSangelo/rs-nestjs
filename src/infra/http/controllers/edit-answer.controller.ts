import { Body, Controller, HttpCode, Param, Put } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { EditAnswerUseCaseAdapter } from '@/infra/use-case-adapter/forum/edit-answer-adapter'

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})
type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswerUseCase: EditAnswerUseCaseAdapter) {}

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
      attachmentsIds: body.attachments,
    })
  }
}

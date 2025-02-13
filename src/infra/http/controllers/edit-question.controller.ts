import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { EditQuestionUseCaseAdapter } from '@/infra/use-case-adapter/forum/edit-question-adapter'

const editQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>
@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestionUseCaseAdapter: EditQuestionUseCaseAdapter) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(new ZodValidationPipe(editQuestionBodySchema))
    body: EditQuestionBodySchema,
    @CurrentUser()
    user: TokenPayloadSchema,
    @Param('id') questionId: string,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.editQuestionUseCaseAdapter.execute({
      title,
      content,
      authorId: userId,
      questionId,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

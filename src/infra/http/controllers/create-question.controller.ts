import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateQuestionUseCaseAdapter } from '@/infra/use-case-adapter/forum/create-question-adapter'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
@Controller('/questions')
export class CreateQuestionController {
  constructor(
    private createQuestionUseCaseAdapter: CreateQuestionUseCaseAdapter,
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(createQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub

    const result = await this.createQuestionUseCaseAdapter.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}

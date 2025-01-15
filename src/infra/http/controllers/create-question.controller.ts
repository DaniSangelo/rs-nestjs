import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateQuestionUseCaseAdapter } from '@/infra/use-case-adapter/create-question-use-case-adapter'

const creatQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof creatQuestionBodySchema>
@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(
    private createQuestionUseCaseAdapter: CreateQuestionUseCaseAdapter,
  ) {}

  @Post()
  async handle(
    @Body(new ZodValidationPipe(creatQuestionBodySchema))
    body: CreateQuestionBodySchema,
    @CurrentUser() user: TokenPayloadSchema,
  ) {
    const { title, content } = body
    const userId = user.sub

    await this.createQuestionUseCaseAdapter.execute({
      title,
      content,
      authorId: userId,
    })
  }
}

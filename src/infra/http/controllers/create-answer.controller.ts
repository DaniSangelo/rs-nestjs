import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { Body, Controller, Param, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { AnswerQuestionUseCaseAdapter } from '@/infra/use-case-adapter/answer-question-adapter'

const createAnswerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

const bodyValidationPipe = new ZodValidationPipe(createAnswerQuestionBodySchema)
type AnswerQuestionBodySchema = z.infer<typeof createAnswerQuestionBodySchema>

@Controller('/questions/:questionId/answers')
export class CreateAnswerController {
  constructor(private createAnswerUseCase: AnswerQuestionUseCaseAdapter) {}

  @Post()
  async handle(
    @Param('questionId') questionId: string,
    @CurrentUser() user: TokenPayloadSchema,
    @Body(bodyValidationPipe) body: AnswerQuestionBodySchema,
  ) {
    const userId = user.sub
    await this.createAnswerUseCase.execute({
      authorId: userId,
      content: body.content,
      questionId,
      attachmentsIds: body.attachments,
    })
  }
}

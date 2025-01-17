import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { CommentOnQuestionUseCaseAdapter } from '@/infra/use-case-adapter/comment-on-question-adapter'
import { Body, Controller, Param, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

const commentOnQuestionValidationPipe = new ZodValidationPipe(
  commentOnQuestionBodySchema,
)

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(
    private commentOnQuestionUseCaseAdapter: CommentOnQuestionUseCaseAdapter,
  ) {}

  @Post()
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Body(commentOnQuestionValidationPipe) body: CommentOnQuestionBodySchema,
    @Param('questionId') questionId: string,
  ) {
    const authorId = user.sub
    const { content } = body
    await this.commentOnQuestionUseCaseAdapter.execute({
      authorId,
      questionId,
      content,
    })
  }
}

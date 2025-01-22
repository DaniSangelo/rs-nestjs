import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenPayloadSchema } from '@/infra/auth/jwt.strategy'
import { CommentOnAnswerUseCaseAdapter } from '@/infra/use-case-adapter/forum/comment-on-answer-adapter'
import { Body, Controller, Param, Post } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const commentOnAnswerBodySchema = z.object({
  content: z.string(),
})

type CommentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>

const commentOnAnswerValidationPipe = new ZodValidationPipe(
  commentOnAnswerBodySchema,
)

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswerUseCase: CommentOnAnswerUseCaseAdapter) {}

  @Post()
  async handle(
    @CurrentUser() user: TokenPayloadSchema,
    @Param('answerId') answerId: string,
    @Body(commentOnAnswerValidationPipe) body: CommentOnAnswerBodySchema,
  ) {
    await this.commentOnAnswerUseCase.execute({
      authorId: user.sub,
      answerId,
      content: body.content,
    })
  }
}

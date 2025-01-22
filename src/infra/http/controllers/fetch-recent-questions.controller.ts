import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { FetchRecentQuestionsUseCaseAdapter } from '@/infra/use-case-adapter/forum/fetch-recent-questions-adapter'
import { QuestionPresenter } from '../presenters/question-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))
const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(
    private fetchRecentQuestionsUseCase: FetchRecentQuestionsUseCaseAdapter,
  ) {}

  @Get()
  @HttpCode(200)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchRecentQuestionsUseCase.execute({ page })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questions = result.value.questions
    return { questions: questions.map(QuestionPresenter.toHTTP) }
  }
}

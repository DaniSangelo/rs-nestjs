import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common'
import { QuestionPresenter } from '../presenters/question-presenter'
import { GetQuestionsBySlugUseCaseAdapter } from '@/infra/use-case-adapter/get-questions-by-slug-adapter'

@Controller('/questions/:slug')
export class GetQuestionsBySlugController {
  constructor(
    private getQuestionsBySlugUseCaseAdapter: GetQuestionsBySlugUseCaseAdapter,
  ) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('slug') slug: string) {
    const result = await this.getQuestionsBySlugUseCaseAdapter.execute({ slug })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionPresenter.toHTTP(result.value.question) }
  }
}

import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common'
import { GetQuestionsBySlugUseCaseAdapter } from '@/infra/use-case-adapter/forum/get-questions-by-slug-adapter'
import { QuestionDetailsPresenter } from '../presenters/question-details-presenter'

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

    return {
      question: QuestionDetailsPresenter.toHTTP(result.value.questionDetails),
    }
  }
}

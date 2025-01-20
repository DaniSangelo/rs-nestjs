import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { PrismaAnswerAttachmentsRepository } from './prisma-answer-attachments-repository'

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  constructor(
    private prismaService: PrismaService,
    private answerAttachmentsRepository: PrismaAnswerAttachmentsRepository,
  ) {}

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prismaService.answer.create({
      data,
    })
  }

  async findById(answerId: string): Promise<Answer | null> {
    const answer = await this.prismaService.answer.findUnique({
      where: {
        id: answerId,
      },
    })

    return answer ? PrismaAnswerMapper.toDomain(answer) : null
  }

  async delete(answer: Answer): Promise<void> {
    await this.prismaService.answer.delete({
      where: {
        id: answer.id.toString(),
      },
    })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)
    await this.prismaService.answer.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = await this.prismaService.answer.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return answers.map((answer) => PrismaAnswerMapper.toDomain(answer))
  }
}

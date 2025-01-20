import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PrismaQuestionAttachmentsRepository } from './prisma-question-attachments-repository'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prismaService: PrismaService,
    private questionAttachmentsRepository: PrismaQuestionAttachmentsRepository,
  ) {}

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prismaService.question.create({
      data,
    })

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    )
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prismaService.question.update({
        where: {
          id: data.id,
        },
        data,
      }),
      this.questionAttachmentsRepository.createMany(
        question.attachments.getNewItems(),
      ),
      this.questionAttachmentsRepository.createMany(
        question.attachments.getRemovedItems(),
      ),
    ])
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prismaService.question.findUnique({
      where: {
        slug,
      },
    })

    return question ? PrismaQuestionMapper.toDomain(question) : null
  }

  async findById(questionId: string): Promise<Question | null> {
    const question = await this.prismaService.question.findUnique({
      where: {
        id: questionId,
      },
    })

    return question ? PrismaQuestionMapper.toDomain(question) : null
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prismaService.question.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prismaService.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return questions.map((question) => PrismaQuestionMapper.toDomain(question))
  }
}

import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private prismaService: PrismaService) {}

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prismaService.comment.create({
      data,
    })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prismaService.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    })
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prismaService.comment.findUnique({
      where: {
        id,
      },
    })

    return questionComment
      ? PrismaQuestionCommentMapper.toDomain(questionComment)
      : null
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = await this.prismaService.comment.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComments.map((questionComment) =>
      PrismaQuestionCommentMapper.toDomain(questionComment),
    )
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    throw new Error('Method not implemented.')
  }
}

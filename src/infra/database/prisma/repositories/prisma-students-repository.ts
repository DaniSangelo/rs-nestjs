import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaService } from '../prisma.service'
import { Student } from '@/domain/forum/enterprise/entities/student'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) return null

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prismaService.user.create({
      data,
    })
  }
}

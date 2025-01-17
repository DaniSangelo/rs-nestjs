import {
  HASH_GENERATOR,
  HashGenerator,
} from '@/domain/forum/application/cryptography/hash-generator'
import {
  STUDENTS_REPOSITORY,
  StudentsRepository,
} from '@/domain/forum/application/repositories/students-repository'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class RegisterStudentUseCaseAdapter extends RegisterStudentUseCase {
  constructor(
    @Inject(STUDENTS_REPOSITORY)
    studentsRepository: StudentsRepository,
    @Inject(HASH_GENERATOR)
    hashGenerator: HashGenerator,
  ) {
    super(studentsRepository, hashGenerator)
  }
}

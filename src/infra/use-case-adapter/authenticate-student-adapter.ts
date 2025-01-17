import {
  Encrypter,
  ENCRYPTER,
} from '@/domain/forum/application/cryptography/encypter'
import {
  HASH_COMPARER,
  HashComparer,
} from '@/domain/forum/application/cryptography/hash-comparer'
import {
  STUDENTS_REPOSITORY,
  StudentsRepository,
} from '@/domain/forum/application/repositories/students-repository'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AuthenticateStudentUseCaseAdapter extends AuthenticateStudentUseCase {
  constructor(
    @Inject(STUDENTS_REPOSITORY)
    studentsRepository: StudentsRepository,
    @Inject(HASH_COMPARER)
    hashComparer: HashComparer,
    @Inject(ENCRYPTER)
    encrypter: Encrypter,
  ) {
    super(studentsRepository, hashComparer, encrypter)
  }
}

import { Either, left, right } from '@/core/either'
import { StudentsRepository } from '../repositories/students-repository'
import { Student } from '../../enterprise/entities/student'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentAlreadyExistsException } from './errors/student-already-exists-exception'

interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsException,
  { student: Student }
>

export class RegisterStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentWithSameEmail =
      await this.studentsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsException())
    }

    const hashedPassword = await this.hashGenerator.hash(password)
    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.studentsRepository.create(student)
    return right({ student })
  }
}

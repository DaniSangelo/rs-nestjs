import { Student } from '../../enterprise/entities/student'

export const STUDENTS_REPOSITORY = Symbol('StudentsRepository');

export interface StudentsRepository {
  findByEmail(email: string): Promise<Student | null>
  create(student: Student): Promise<void>
}

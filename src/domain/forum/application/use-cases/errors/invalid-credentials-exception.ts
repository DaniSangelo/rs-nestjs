import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidCredentialsException extends Error implements UseCaseError {
  constructor() {
    super('Invalid credentials')
  }
}

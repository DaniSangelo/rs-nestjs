import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'

const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthBodySchema = z.infer<typeof authBodySchema>

@Controller('/sessions')
export class AuthController {
  constructor(private authenticateStudentUseCase: AuthenticateStudentUseCase) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async handle(@Body() body: AuthBodySchema) {
    const { email, password } = body

    const result = await this.authenticateStudentUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) throw new Error()

    return { access_token: result.value.accessToken }
  }
}

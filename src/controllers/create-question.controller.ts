import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@/auth/current-user-decorator";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { TokenPayloadSchema } from "@/auth/jwt.strategy";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";
import { PrismaService } from "@/prisma/prisma.service";
import { z } from "zod";

const creatQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof creatQuestionBodySchema>
@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
    constructor(private prisma: PrismaService) {}

    @Post()
    async handle(@Body(new ZodValidationPipe(creatQuestionBodySchema)) body: CreateQuestionBodySchema, @CurrentUser() user: TokenPayloadSchema) {
        const { title, content } = body
        const userId = user.sub

        const slug = this.convertToSlug(title)

        await this.prisma.question.create({
            data: {
                title,
                content,
                slug: slug,
                authorId: userId,
            }
        })
    }

    private convertToSlug(text: string) {
        return text
            .toLocaleLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g,"-");
    }
}
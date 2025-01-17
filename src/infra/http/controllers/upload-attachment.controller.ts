import { InvalidAttachmentTypeException } from '@/domain/forum/application/use-cases/errors/invalid-attachment-type-exception'
import { UploadAndCreateAttachmentUseCaseAdapter } from '@/infra/use-case-adapter/upload-and-create-attachment-adapter'
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('/attachments')
export class UploadAttachmentController {
  constructor(
    private uploadAndCreateAttachmentUseCase: UploadAndCreateAttachmentUseCaseAdapter,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }), // 2mb
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.uploadAndCreateAttachmentUseCase.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidAttachmentTypeException:
          throw new BadRequestException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { attachment } = result.value

    return {
      attachmentId: attachment.id.toString(),
    }
  }
}

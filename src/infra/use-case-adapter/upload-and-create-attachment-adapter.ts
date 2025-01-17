import {
  ATTACHMENTS_REPOSITORY,
  AttachmentsRepository,
} from '@/domain/forum/application/repositories/attachments-repository'
import { Uploader, UPLOADER } from '@/domain/forum/application/storage/uploader'
import { UploadAndCreateAttachmentsUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UploadAndCreateAttachmentUseCaseAdapter extends UploadAndCreateAttachmentsUseCase {
  constructor(
    @Inject(ATTACHMENTS_REPOSITORY)
    attachmentsRepository: AttachmentsRepository,
    @Inject(UPLOADER)
    uploader: Uploader,
  ) {
    super(attachmentsRepository, uploader)
  }
}

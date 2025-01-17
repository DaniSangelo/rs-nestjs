import { Attachment } from '../../enterprise/entities/attachment'

export const ATTACHMENTS_REPOSITORY = Symbol('AttachmentsRepository')
export interface AttachmentsRepository {
  create(attachment: Attachment): Promise<void>
}

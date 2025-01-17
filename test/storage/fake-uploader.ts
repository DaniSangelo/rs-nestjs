import {
  Uploader,
  UploadParams,
} from '@/domain/forum/application/storage/uploader'
import { randomUUID } from 'node:crypto'

interface Upload {
  fileName: string
  link: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []
  async upload(params: UploadParams): Promise<{ link: string }> {
    const link = randomUUID()
    this.uploads.push({
      fileName: params.fileName,
      link,
    })

    return { link }
  }
}

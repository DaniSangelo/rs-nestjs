import {
  Uploader,
  UploadParams,
} from '@/domain/forum/application/storage/uploader'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { EnvService } from '../env/env.service'
import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'
import { headerDefault } from '@aws-sdk/middleware-header-default';

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client

  constructor(private envService: EnvService) {
    const cloudFlareAccountId = envService.get('CLOUDFLARE_ACCOUNT_ID')
    const endpoint = envService.get('R2_ENDPOINT')
    this.client = new S3Client({
      endpoint: endpoint.replace(
        '{CLOUDFLARE_ACCOUNT_ID}',
        cloudFlareAccountId,
      ),
      credentials: {
        accessKeyId: envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envService.get('AWS_SECRET_ACCESS_KEY'),
      },
      region: 'auto',
      forcePathStyle: true,
    })

    this.client.middlewareStack.add(
      headerDefault({
        'x-amz-checksum-crc32': 'pxLRGw==',
      }),
      { step: 'build' }
    );
  }

  async upload(params: UploadParams): Promise<{ link: string }> {
    const uploadId = randomUUID()
    const uniqueFileName = `${uploadId}-${params.fileName}`

    try {
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.envService.get('AWS_BUCKET_NAME'),
          Key: uniqueFileName,
          ContentType: params.fileType,
          Body: params.body,
        }),
      )
    } catch (error) {
      console.log('daniel',error)
      throw new Error()
    }
    return { link: uniqueFileName }
  }
}

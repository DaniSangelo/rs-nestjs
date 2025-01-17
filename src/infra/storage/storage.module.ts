import { Module } from '@nestjs/common'
import { R2Storage } from './r2-storage'
import { UPLOADER } from '@/domain/forum/application/storage/uploader'
import { EnvService } from '../env/env.service'

@Module({
  providers: [
    EnvService,
    {
      provide: UPLOADER,
      useClass: R2Storage,
    },
  ],
  exports: [UPLOADER],
})
export class StorageModule {}

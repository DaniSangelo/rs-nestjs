import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { CACHE_REPOSITORY } from './cache-repository'
import { RedisCacheRepository } from './redis/redis-cache-repository'
import { RedisService } from './redis/redis.service'

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: CACHE_REPOSITORY,
      useClass: RedisCacheRepository,
    },
    RedisCacheRepository,
  ],
  exports: [CACHE_REPOSITORY, RedisCacheRepository, RedisService],
})
export class CacheModule {}

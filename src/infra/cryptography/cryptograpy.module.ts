import { ENCRYPTER } from '@/domain/forum/application/cryptography/encypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HASH_COMPARER } from '@/domain/forum/application/cryptography/hash-comparer'
import { BcryptHasher } from './bcrypt.hasher'
import { HASH_GENERATOR } from '@/domain/forum/application/cryptography/hash-generator'

@Module({
  providers: [
    {
      provide: ENCRYPTER,
      useClass: JwtEncrypter,
    },
    {
      provide: HASH_COMPARER,
      useClass: BcryptHasher,
    },
    {
      provide: HASH_GENERATOR,
      useClass: BcryptHasher,
    },
  ],
  exports: [ENCRYPTER, HASH_COMPARER, HASH_GENERATOR],
})
export class CryptographyModule {}

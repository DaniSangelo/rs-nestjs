export const HASH_GENERATOR = Symbol('HashGenerator')
export interface HashGenerator {
  hash(plain: string): Promise<string>
}

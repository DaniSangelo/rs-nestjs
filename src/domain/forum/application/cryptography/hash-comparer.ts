export const HASH_COMPARER = Symbol('HashComparer')
export interface HashComparer {
  compare(plain: string, hash: string): Promise<boolean>
}

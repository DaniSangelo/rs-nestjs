export const ENCRYPTER = Symbol('Encrypter')
export interface Encrypter {
  encrypt(payload: Record<string, unknown>): Promise<string>
}

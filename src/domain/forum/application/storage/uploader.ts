export interface UploadParams {
  fileName: string
  fileType: string
  body: Buffer
}

export const UPLOADER = Symbol('Uploader')
export interface Uploader {
  upload(params: UploadParams): Promise<{ url: string }>
}

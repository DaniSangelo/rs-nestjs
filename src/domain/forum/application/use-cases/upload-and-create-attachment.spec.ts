import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachment-repository'
import { UploadAndCreateAttachmentsUseCase } from './upload-and-create-attachment'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidAttachmentTypeException } from './errors/invalid-attachment-type-exception'

let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let sut: UploadAndCreateAttachmentsUseCase
let fakeUploader: FakeUploader

describe.skip('Upload and create attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    fakeUploader = new FakeUploader()
    sut = new UploadAndCreateAttachmentsUseCase(
      inMemoryAttachmentRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create an attachment', async () => {
    const result = await sut.execute({
      fileName: 'reivendell.png',
      fileType: 'image/png',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'reivendell.png',
      }),
    )
  })

  it('should not be able to upload and create an attachment with an invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'reivendell.mp3',
      fileType: 'image/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeException)
  })
})

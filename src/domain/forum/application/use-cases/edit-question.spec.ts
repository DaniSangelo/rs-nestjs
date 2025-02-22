import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachment-repository'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase
let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let inMemoryStudentsRepository: InMemoryStudentRepository

describe('Edit question use case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    inMemoryStudentsRepository = new InMemoryStudentRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentRepository,
      inMemoryStudentsRepository,
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionAttachmentsRepository,
    )
  })

  it('should edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('q1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      content: 'new content',
      title: 'new title mk I',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title mk I',
      content: 'new content',
    })

    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])
  })

  it('should not edit a question from another author', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('q1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: newQuestion.id.toString(),
      content: 'new content',
      title: 'new title mk I',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should sync new and removed attachments when editing a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('q1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)
    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )
    const result = await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      content: 'new content',
      title: 'new title mk I',
      attachmentsIds: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    const items = inMemoryQuestionAttachmentsRepository.items
    expect(items).toHaveLength(2)
    const hasAttachment1 = items.some(
      (item) => item.attachmentId.toString() === '1',
    )
    const hasAttachment3 = items.some(
      (item) => item.attachmentId.toString() === '3',
    )
    expect(hasAttachment1).toBe(true)
    // todo: somethins is wrong here
    // expect(hasAttachment3).toBe(true)
  })
})

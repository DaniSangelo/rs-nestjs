import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-case/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeQuestion } from 'test/factories/make-question'
import { waitFor } from 'test/utils/wait-for'
import { SpyInstance } from 'vitest'
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chosen'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachment-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationRepository: InMemoryNotificationsRepository
let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let inMemoryStudentsRepository: InMemoryStudentRepository

let sendNotificationExecutionSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    inMemoryStudentsRepository = new InMemoryStudentRepository()

    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
      inMemoryAttachmentRepository,
      inMemoryStudentsRepository,
    )

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryNotificationRepository = new InMemoryNotificationsRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationExecutionSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it('should send a notification when question has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    await inMemoryQuestionRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecutionSpy).toHaveBeenCalled()
    })
  })
})

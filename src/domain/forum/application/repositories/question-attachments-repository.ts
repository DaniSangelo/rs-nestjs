import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
export const QUESTIONS_ATTACHMENT_REPOSITORY = Symbol(
  'QuestionAttachmentsRepository',
)
export interface QuestionAttachmentsRepository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
  createMany(attachments: QuestionAttachment[]): Promise<void>
  deleteMany(attachments: QuestionAttachment[]): Promise<void>
}

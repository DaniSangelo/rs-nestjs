import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export const ANSWER_ATTACHMENTS_REPOSITORY = Symbol('AnswersRepository');
export interface AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}

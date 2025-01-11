import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  #id: UniqueEntityID
  protected props: Props

  get id() {
    return this.#id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this.#id = id ?? new UniqueEntityID(id)
  }

  public equals(entity: Entity<unknown>): boolean {
    if (entity === this) {
      return true
    }

    return entity.id === this.#id
  }
}

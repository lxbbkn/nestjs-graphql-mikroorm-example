import { Entity, Property } from '@mikro-orm/core'
import { ObjectType, Field } from '@nestjs/graphql'
import { Base } from 'common/entities/base.entity'

@ObjectType()
@Entity({ collection: 'todos' })
export class Todo extends Base {
  @Field(() => Boolean)
  @Property()
  done!: boolean

  @Field(() => String)
  @Property()
  title!: string

  @Field(() => String)
  @Property()
  description?: string

  constructor() {
    super()
    this.done = false
  }
}

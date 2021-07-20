import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { ObjectId } from '@mikro-orm/mongodb'
import { Field, ObjectType, ID } from '@nestjs/graphql'

@ObjectType({ isAbstract: true })
@Entity()
export abstract class Base {
  @Field(() => ID)
  @PrimaryKey()
  readonly _id!: ObjectId

  @Field(() => Date)
  @Property()
  readonly createdAt: Date = new Date()

  @Field(() => Date)
  @Property({ onUpdate: () => new Date() })
  readonly updatedAt: Date = new Date()
}

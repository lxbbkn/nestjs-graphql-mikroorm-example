import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateTodoInput {
  @Field(() => Boolean, { nullable: true })
  readonly done?: boolean

  @Field(() => String, { nullable: true })
  readonly title?: string

  @Field(() => String, { nullable: true })
  readonly description?: string
}

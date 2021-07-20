import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateTodoInput {
  @Field(() => String)
  readonly title!: string

  @Field(() => String, { nullable: true })
  readonly description?: string
}

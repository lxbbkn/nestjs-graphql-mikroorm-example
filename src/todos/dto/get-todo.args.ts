import { Field, ArgsType } from '@nestjs/graphql'

@ArgsType()
export class GetTodoArgs {
  @Field(() => Boolean, { nullable: true })
  readonly done?: boolean

  @Field(() => String, { nullable: true })
  readonly search?: string
}

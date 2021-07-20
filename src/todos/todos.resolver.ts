import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateTodoInput } from './dto/create-todo.input'
import { GetTodoArgs } from './dto/get-todo.args'
import { UpdateTodoInput } from './dto/update-todo.input'
import { Todo } from './entities/todo.entity'
import { TodosService } from './todos.service'

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo])
  findAll(@Args() args?: GetTodoArgs): Promise<Todo[]> {
    return this.todosService.findAll(args)
  }

  @Query(() => Todo)
  findById(@Args('id') id: string): Promise<Todo> {
    return this.todosService.findById(id)
  }

  @Mutation(() => Todo)
  createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    return this.todosService.create(input)
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id') id: string,
    @Args('input') input: UpdateTodoInput,
  ): Promise<Todo> {
    return this.todosService.update(id, input)
  }

  @Mutation(() => String)
  removeTodo(@Args('id') id: string): Promise<string> {
    return this.todosService.remove(id)
  }
}

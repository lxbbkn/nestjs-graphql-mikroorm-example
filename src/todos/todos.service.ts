import { FilterQuery, wrap } from '@mikro-orm/core'
import { EntityRepository } from '@mikro-orm/mongodb'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { isNull } from 'common/utils/is-null.util'
import { CreateTodoInput } from './dto/create-todo.input'
import { GetTodoArgs } from './dto/get-todo.args'
import { UpdateTodoInput } from './dto/update-todo.input'
import { Todo } from './entities/todo.entity'

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>,
  ) {}

  private getFilter(args: GetTodoArgs): FilterQuery<Todo> {
    const { done, search } = args

    let filter = null

    if (!isNull(done)) {
      filter = { ...filter, done }
    }

    if (!isNull(search)) {
      filter = {
        ...filter,
        $or: [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
        ],
      }
    }

    return filter
  }

  async findAll(args?: GetTodoArgs): Promise<Todo[]> {
    const todos = this.todoRepository.find(this.getFilter(args))
    return todos
  }

  async findById(id: string): Promise<Todo> {
    return this.todoRepository.findOneOrFail(id)
  }

  async create(input: CreateTodoInput): Promise<Todo> {
    const todo = new Todo()
    wrap(todo).assign(input)
    await this.todoRepository.persistAndFlush(todo)
    return todo
  }

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const todo = await this.findById(id)
    wrap(todo).assign(input)
    await this.todoRepository.persistAndFlush(todo)
    return todo
  }

  async remove(id: string): Promise<string> {
    const todo = await this.findById(id)
    await this.todoRepository.removeAndFlush(todo)
    return id
  }
}

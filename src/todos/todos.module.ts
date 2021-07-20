import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Todo } from './entities/todo.entity'
import { TodosResolver } from './todos.resolver'
import { TodosService } from './todos.service'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Todo] })],
  providers: [TodosResolver, TodosService],
})
export class TodosModule {}

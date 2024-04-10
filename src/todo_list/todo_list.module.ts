import { Module } from '@nestjs/common';
import { TodoListController } from './todo_list.controller';
import { TodoListService } from './todo_list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListSchema, TodoList } from './schemas/todo_list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoList.name, schema: TodoListSchema },
    ]),
  ],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}

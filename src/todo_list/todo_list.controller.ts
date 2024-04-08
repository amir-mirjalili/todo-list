import { Controller, Post, Body } from '@nestjs/common';
import { TodoListService } from './todo_list.service';
import { CreateTodoListDto } from './dto/todo_list.insert.dto';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  async create(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoListService.create(createTodoListDto);
  }
}

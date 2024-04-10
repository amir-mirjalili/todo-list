import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TodoListService } from './todo_list.service';
import { CreateTodoListDto } from './dto/todo_list.insert.dto';
import { UpdateTodoListDto } from './dto/todo_list.update.dto';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  async create(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoListService.create(createTodoListDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.todoListService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.updateById(id, updateTodoListDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.todoListService.delete(id);
  }

  @Get()
  async getAll() {
    return this.todoListService.getAll();
  }
}

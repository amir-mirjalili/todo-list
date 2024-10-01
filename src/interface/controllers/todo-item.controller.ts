import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoItemDto } from '../../application/dto/create-todo-item.dto';
import { CreateTodoItemCommand } from '../../application/commands/todo-item/create.todo-item.command';
import { UpdateTodoItemDto } from '../../application/dto/update-todo-item.dto';
import { UpdateTodoItemCommand } from '../../application/commands/todo-item/update.todo-item.command';
import { DeleteTodoItemCommand } from '../../application/commands/todo-item/delete.todo-item.command';
import { PrioritizeTodoItemDto } from '../../application/dto/prioritize-todo-item.dto';
import { PrioritizeTodoItemCommand } from '../../application/commands/todo-item/prioritize.todo-item.command';

@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() body: CreateTodoItemDto): Promise<void> {
    return this.commandBus.execute(
      new CreateTodoItemCommand(body.title, body.description, body.todoListId),
    );
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateTodoItemDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new UpdateTodoItemCommand(id, body.title, body.description),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteTodoItemCommand(id));
  }

  @Patch('/:id/prioritize')
  async prioritize(
    @Param('id') id: string,
    @Body() body: PrioritizeTodoItemDto,
  ): Promise<void> {
    return this.commandBus.execute(
      new PrioritizeTodoItemCommand(id, body.priority),
    );
  }
}

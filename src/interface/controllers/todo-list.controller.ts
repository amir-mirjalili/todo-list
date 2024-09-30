import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoListDto } from '../../application/dto/create-todo-list.dto';
import { CreateTodoListCommand } from '../../application/commands/user/create.todo-list.command';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  async create(@Body() body: CreateTodoListDto): Promise<void> {
    return this.commandBus.execute(
      new CreateTodoListCommand(body.title, body.userId),
    );
  }
}

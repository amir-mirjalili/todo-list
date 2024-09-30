import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTodoListDto } from '../../application/dto/create-todo-list.dto';
import { CreateTodoListCommand } from '../../application/commands/todo-list/create.todo-list.command';
import { UpdateTodoListCommand } from '../../application/commands/todo-list/update.todo-list.command';
import { UpdateTitleTodoListDto } from '../../application/dto/update-title-todo-list.dto';
import { DeleteTodoListCommand } from '../../application/commands/todo-list/delete.todo-list.command';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly commandBus: CommandBus) {}
  @Post()
  async create(@Body() body: CreateTodoListDto): Promise<void> {
    return this.commandBus.execute(
      new CreateTodoListCommand(body.title, body.userId),
    );
  }

  @Patch('/title/:id')
  async updateTitle(
    @Param('id') id: string,
    @Body() body: UpdateTitleTodoListDto,
  ): Promise<void> {
    return this.commandBus.execute(new UpdateTodoListCommand(id, body.title));
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteTodoListCommand(id));
  }
}

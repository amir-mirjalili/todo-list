import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoItemCommand } from '../../commands/todo-item/create.todo-item.command';
import { TodoItemDomainService } from '../../../domain/services/todo-item.domain.service';

@CommandHandler(CreateTodoItemCommand)
export class CreateTodoItemCommandHandlers
  implements ICommandHandler<CreateTodoItemCommand>
{
  constructor(private readonly todoItemDomainService: TodoItemDomainService) {}
  async execute(command: CreateTodoItemCommand): Promise<void> {
    await this.todoItemDomainService.create(
      command.title,
      command.description,
      command.todoListId,
    );
  }
}

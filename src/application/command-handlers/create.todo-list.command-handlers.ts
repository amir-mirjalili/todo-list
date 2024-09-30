import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTodoListCommand } from '../commands/user/create.todo-list.command';
import { TodoListDomainService } from '../../domain/services/todo-list.domain.service';

@CommandHandler(CreateTodoListCommand)
export class CreateTodoListCommandHandlers
  implements ICommandHandler<CreateTodoListCommand>
{
  constructor(private readonly todoListDomainService: TodoListDomainService) {}
  async execute(command: CreateTodoListCommand): Promise<void> {
    await this.todoListDomainService.create(command.title, command.userId);
  }
}

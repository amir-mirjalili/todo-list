import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoListDomainService } from '../../../domain/services/todo-list.domain.service';
import { UpdateTodoListCommand } from '../../commands/todo-list/update.todo-list.command';

@CommandHandler(UpdateTodoListCommand)
export class UpdateTodoListCommandHandlers
  implements ICommandHandler<UpdateTodoListCommand>
{
  constructor(private readonly todoListDomainService: TodoListDomainService) {}
  async execute(command: UpdateTodoListCommand): Promise<void> {
    await this.todoListDomainService.updateTitle(command.id, command.title);
  }
}

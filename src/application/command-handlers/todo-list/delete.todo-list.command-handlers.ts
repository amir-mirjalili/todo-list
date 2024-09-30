import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoListDomainService } from '../../../domain/services/todo-list.domain.service';
import { DeleteTodoListCommand } from '../../commands/todo-list/delete.todo-list.command';

@CommandHandler(DeleteTodoListCommand)
export class DeleteTodoListCommandHandlers
  implements ICommandHandler<DeleteTodoListCommand>
{
  constructor(private readonly todoListDomainService: TodoListDomainService) {}
  async execute(command: DeleteTodoListCommand): Promise<void> {
    await this.todoListDomainService.delete(command.id);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemDomainService } from '../../../domain/services/todo-item.domain.service';
import { DeleteTodoItemCommand } from '../../commands/todo-item/delete.todo-item.command';

@CommandHandler(DeleteTodoItemCommand)
export class DeleteTodoItemCommandHandlers
  implements ICommandHandler<DeleteTodoItemCommand>
{
  constructor(private readonly todoItemDomainService: TodoItemDomainService) {}
  async execute(command: DeleteTodoItemCommand): Promise<void> {
    await this.todoItemDomainService.delete(command.id);
  }
}

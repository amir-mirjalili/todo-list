import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTodoItemCommand } from '../../commands/todo-item/update.todo-item.command';
import { TodoItemDomainService } from '../../../domain/services/todo-item.domain.service';

@CommandHandler(UpdateTodoItemCommand)
export class UpdateTodoItemCommandHandlers
  implements ICommandHandler<UpdateTodoItemCommand>
{
  constructor(private readonly todoItemDomainService: TodoItemDomainService) {}
  async execute(command: UpdateTodoItemCommand): Promise<void> {
    await this.todoItemDomainService.update(
      command.id,
      command.title,
      command.description,
    );
  }
}

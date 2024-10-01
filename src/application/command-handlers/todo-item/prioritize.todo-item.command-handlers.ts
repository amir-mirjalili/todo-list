import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TodoItemDomainService } from '../../../domain/services/todo-item.domain.service';
import { PrioritizeTodoItemCommand } from '../../commands/todo-item/prioritize.todo-item.command';

@CommandHandler(PrioritizeTodoItemCommand)
export class PrioritizeTodoItemCommandHandlers
  implements ICommandHandler<PrioritizeTodoItemCommand>
{
  constructor(private readonly todoItemDomainService: TodoItemDomainService) {}
  async execute(command: PrioritizeTodoItemCommand): Promise<void> {
    await this.todoItemDomainService.prioritize(command.id, command.priority);
  }
}

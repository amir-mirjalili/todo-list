import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../commands/user/create.user.command';
import { UserDomainService } from '../../../domain/services/user.domain.service';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(private readonly userDomainService: UserDomainService) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userDomainService.create(command.userName, command.password);
  }
}

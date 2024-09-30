import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserDomainService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async create(userName: string, password: string): Promise<void> {
    const user = new User(userName, password);
    await this.userRepository.save(user);
  }
}

import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserDomainService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async create(userName: string, password: string): Promise<void> {
    password = await this.hashPassword(password);
    const user = new User(userName, password);
    await this.userRepository.save(user);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}

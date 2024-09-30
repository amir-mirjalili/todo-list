import { UserRepository } from '../../domain/repositories/user.repository';
import { Model } from 'mongoose';
import { User } from '../../domain/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../schemas/user.schema';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async save(user: User): Promise<void> {
    console.log('miad???');
    const newUser = new this.userModel(user);
    await newUser.save();
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './interface/controllers/user.controller';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository-impl';
import { CreateUserCommandHandler } from './application/command-handlers/create.user.command-handler';
import { UserDomainService } from './domain/services/user.domain.service';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    UserDomainService,
    CreateUserCommandHandler,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UserSchema } from './infrastructure/schemas/user.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './interface/controllers/user.controller';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository-impl';
import { CreateUserCommandHandler } from './application/command-handlers/user/create.user.command-handler';
import { UserDomainService } from './domain/services/user.domain.service';
import { TodoListSchema } from './infrastructure/schemas/todo-list.schema';
import { TodoListController } from './interface/controllers/todo-list.controller';
import { TodoListDomainService } from './domain/services/todo-list.domain.service';
import { CreateTodoListCommandHandlers } from './application/command-handlers/todo-list/create.todo-list.command-handlers';
import { TodoListRepositoryImpl } from './infrastructure/repositories/todo-list.repository-impl';
import { UpdateTodoListCommandHandlers } from './application/command-handlers/todo-list/update.todo-list.command-handlers';
import { DeleteTodoListCommandHandlers } from './application/command-handlers/todo-list/delete.todo-list.command-handlers';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'TodoList', schema: TodoListSchema },
    ]),
    CqrsModule,
  ],
  controllers: [UserController, TodoListController],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    { provide: 'TodoListRepository', useClass: TodoListRepositoryImpl },
    UserDomainService,
    TodoListDomainService,
    CreateUserCommandHandler,
    CreateTodoListCommandHandlers,
    UpdateTodoListCommandHandlers,
    DeleteTodoListCommandHandlers,
  ],
})
export class AppModule {}

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
import { TodoItemRepositoryImpl } from './infrastructure/repositories/todo-item.repository-impl';
import { TodoItemDomainService } from './domain/services/todo-item.domain.service';
import { CreateTodoItemCommandHandlers } from './application/command-handlers/todo-item/create.todo-item.command-handlers';
import { UpdateTodoItemCommandHandlers } from './application/command-handlers/todo-item/update.todo-item.command-handlers';
import { DeleteTodoItemCommandHandlers } from './application/command-handlers/todo-item/delete.todo-item.command-handlers';
import { TodoItemSchema } from './infrastructure/schemas/todo-item.schema';
import { TodoItemController } from './interface/controllers/todo-item.controller';
import { PrioritizeTodoItemCommandHandlers } from './application/command-handlers/todo-item/prioritize.todo-item.command-handlers';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'TodoList', schema: TodoListSchema },
      { name: 'TodoItem', schema: TodoItemSchema },
    ]),
    CqrsModule,
  ],
  controllers: [UserController, TodoListController, TodoItemController],
  providers: [
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
    { provide: 'TodoListRepository', useClass: TodoListRepositoryImpl },
    { provide: 'TodoItemRepository', useClass: TodoItemRepositoryImpl },
    UserDomainService,
    TodoListDomainService,
    TodoItemDomainService,
    CreateUserCommandHandler,
    CreateTodoListCommandHandlers,
    UpdateTodoListCommandHandlers,
    DeleteTodoListCommandHandlers,
    CreateTodoItemCommandHandlers,
    UpdateTodoItemCommandHandlers,
    DeleteTodoItemCommandHandlers,
    PrioritizeTodoItemCommandHandlers,
  ],
})
export class AppModule {}

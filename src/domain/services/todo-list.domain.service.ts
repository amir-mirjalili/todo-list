import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoListRepository } from '../repositories/todo-list.repository';
import { TodoList } from '../entities/todo-list.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class TodoListDomainService {
  constructor(
    @Inject('TodoListRepository')
    private readonly todoListRepository: TodoListRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}
  async create(title: string, userId: string): Promise<void> {
    //check userExist
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const todoList = new TodoList(title, userId);
    await this.todoListRepository.save(todoList);
  }

  async updateTitle(id: string, title: string): Promise<void> {
    await this.todoListRepository.editTitle(id, title);
  }

  async delete(id: string): Promise<void> {
    await this.todoListRepository.delete(id);
  }
}

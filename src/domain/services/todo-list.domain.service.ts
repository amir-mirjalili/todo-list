import { Inject, Injectable } from '@nestjs/common';
import { TodoListRepository } from '../repositories/todo-list.repository';
import { TodoList } from '../entities/todo-list.entity';

@Injectable()
export class TodoListDomainService {
  constructor(
    @Inject('TodoListRepository')
    private readonly todoListRepository: TodoListRepository,
  ) {}
  async create(title: string, userId: string): Promise<void> {
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

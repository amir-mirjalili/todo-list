import { TodoItemRepository } from '../repositories/todo-item.repository';
import { Inject, Injectable } from '@nestjs/common';
import { TodoItem } from '../entities/todo-item.entity';

@Injectable()
export class TodoItemDomainService {
  constructor(
    @Inject('TodoItemRepository')
    private readonly todoItemRepository: TodoItemRepository,
  ) {}
  async create(
    title: string,
    description: string,
    priority: number,
    todoListId: string,
  ): Promise<void> {
    const todoItem = new TodoItem(title, description, priority, todoListId);
    await this.todoItemRepository.save(todoItem);
  }

  async update(id: string, title: string, description: string): Promise<void> {
    await this.todoItemRepository.edit(id, title, description);
  }

  async delete(id: string): Promise<void> {
    await this.todoItemRepository.delete(id);
  }
}

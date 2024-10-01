import { TodoItemRepository } from '../repositories/todo-item.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TodoItem } from '../entities/todo-item.entity';
import { TodoListRepository } from '../repositories/todo-list.repository';

@Injectable()
export class TodoItemDomainService {
  constructor(
    @Inject('TodoItemRepository')
    private readonly todoItemRepository: TodoItemRepository,
    @Inject('TodoListRepository')
    private readonly todoListRepository: TodoListRepository,
  ) {}
  async create(
    title: string,
    description: string,
    todoListId: string,
  ): Promise<void> {
    //check todoListExist
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) {
      throw new NotFoundException('Todolist not found');
    }
    const lastItem = await this.todoItemRepository.getLastPriority(todoListId);
    const todoItem = new TodoItem(
      title,
      description,
      lastItem ? lastItem.priority + 1 : 0,
      todoListId,
    );
    await this.todoItemRepository.save(todoItem);
  }

  async update(id: string, title: string, description: string): Promise<void> {
    await this.todoItemRepository.edit(id, title, description);
  }

  async delete(id: string): Promise<void> {
    await this.todoItemRepository.delete(id);
  }
}

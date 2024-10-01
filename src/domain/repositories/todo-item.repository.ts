import { TodoItem } from '../entities/todo-item.entity';

export interface TodoItemRepository {
  save(todoItem: TodoItem): Promise<void>;
  edit(id: string, title: string, description: string): Promise<void>;
  delete(id: string): Promise<void>;
  getLastPriority(todoListId: string): Promise<TodoItem>;
  decreasePriority(
    todoListId: string,
    currentPriority: number,
    newPriority: number,
    notId: string,
  ): Promise<void>;
  increasePriority(
    todoListId: string,
    currentPriority: number,
    newPriority: number,
    notId: string,
  ): Promise<void>;
  findById(id: string): Promise<TodoItem>;
  updateOnePriority(id: string, priority: number): Promise<void>;
}

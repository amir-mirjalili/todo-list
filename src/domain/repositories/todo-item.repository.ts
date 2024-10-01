import { TodoItem } from '../entities/todo-item.entity';

export interface TodoItemRepository {
  save(todoItem: TodoItem): Promise<void>;
  edit(id: string, title: string, description: string): Promise<void>;
  delete(id: string): Promise<void>;
}

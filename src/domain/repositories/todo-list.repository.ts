import { TodoList } from '../entities/todo-list.entity';

export interface TodoListRepository {
  save(todoList: TodoList): Promise<void>;
  editTitle(id: string, title: string): Promise<void>;
  delete(id: string): Promise<void>;
}

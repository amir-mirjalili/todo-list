import { TodoList } from '../entities/todo-list.entity';

export interface TodoListRepository {
  save(todoList: TodoList): Promise<void>;
}

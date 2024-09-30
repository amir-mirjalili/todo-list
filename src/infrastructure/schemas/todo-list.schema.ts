import { Schema } from 'mongoose';
import { TodoItem } from '../../domain/entities/todo-item.entity';

export const TodoListSchema = new Schema({
  title: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  todoItems: [],
});

export interface TodoListDocument extends Document {
  title: string;
  userId: string;
  todoItems: TodoItem[];
}

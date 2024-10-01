import { Schema } from 'mongoose';

export const TodoItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: Number, default: 0 },
  todoListId: { type: Schema.Types.ObjectId, ref: 'TodoList', required: true },
});
export interface TodoItemDocument extends Document {
  title: string;
  description: string;
  priority: number;
  todoListId: string;
}

import { Schema } from 'mongoose';

export const TodoListSchema = new Schema({
  title: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export interface TodoListDocument extends Document {
  title: string;
  userId: string;
}

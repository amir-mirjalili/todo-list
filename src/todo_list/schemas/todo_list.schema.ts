import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TodoStatus } from './todo_list.status.enum';

@Schema({ timestamps: true })
export class TodoList extends Document {
  @Prop({ required: true })
  taskName: string;
  @Prop({ required: true, type: Date })
  duoDate: Date;
  @Prop({ required: true, default: TodoStatus.Pending, enum: TodoStatus })
  status: TodoStatus;
  note: string;
}
export const TodoListSchema = SchemaFactory.createForClass(TodoList);

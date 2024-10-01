import { TodoListRepository } from '../../domain/repositories/todo-list.repository';
import { Model } from 'mongoose';
import { TodoListDocument } from '../schemas/todo-list.schema';
import { InjectModel } from '@nestjs/mongoose';
import { TodoList } from 'src/domain/entities/todo-list.entity';

export class TodoListRepositoryImpl implements TodoListRepository {
  constructor(
    @InjectModel('TodoList')
    private readonly todoListModel: Model<TodoListDocument>,
  ) {}

  async findById(id: string): Promise<TodoList> {
    return this.todoListModel.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.todoListModel.deleteOne({ _id: id });
  }

  async editTitle(id: string, title: string): Promise<void> {
    await this.todoListModel.updateOne({ _id: id }, { $set: { title } });
  }

  async save(todoList: TodoList): Promise<void> {
    await new this.todoListModel(todoList).save();
  }
}

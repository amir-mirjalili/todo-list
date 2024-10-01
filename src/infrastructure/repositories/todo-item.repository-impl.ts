import { TodoItem } from 'src/domain/entities/todo-item.entity';
import { TodoItemRepository } from '../../domain/repositories/todo-item.repository';
import { Model } from 'mongoose';
import { TodoItemDocument } from '../schemas/todo-item.schema';
import { InjectModel } from '@nestjs/mongoose';

export class TodoItemRepositoryImpl implements TodoItemRepository {
  constructor(
    @InjectModel('TodoItem')
    private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async updateOnePriority(id: string, priority: number): Promise<void> {
    await this.todoItemModel.updateOne(
      { _id: id },
      { $set: { priority: priority } },
    );
  }

  async findById(id: string): Promise<TodoItem> {
    return this.todoItemModel.findById(id);
  }

  async save(todoItem: TodoItem): Promise<void> {
    await new this.todoItemModel(todoItem).save();
  }
  async edit(id: string, title: string, description: string): Promise<void> {
    await this.todoItemModel.updateOne(
      { _id: id },
      { $set: { title, description } },
    );
  }
  async delete(id: string): Promise<void> {
    await this.todoItemModel.deleteOne({ _id: id });
  }

  async getLastPriority(todoListId: string): Promise<TodoItem> {
    return this.todoItemModel
      .findOne({ todoListId })
      .sort({ priority: -1 })
      .limit(1);
  }

  async increasePriority(
    todoListId: string,
    currentPriority: number,
    newPriority: number,
    notId: string,
  ): Promise<void> {
    await this.todoItemModel.updateMany(
      {
        $and: [
          { todoListId },
          {
            priority: { $gte: newPriority },
          },
          {
            priority: { $lt: currentPriority },
          },
          {
            _id: { $ne: notId },
          },
        ],
      },
      { $inc: { priority: 1 } },
    );
  }

  async decreasePriority(
    todoListId: string,
    currentPriority: number,
    newPriority: number,
    notId: string,
  ): Promise<void> {
    await this.todoItemModel.updateMany(
      {
        $and: [
          { todoListId },
          {
            priority: { $gt: currentPriority },
          },
          {
            priority: { $lte: newPriority },
          },
          {
            _id: { $ne: notId },
          },
        ],
      },
      { $inc: { priority: -1 } },
    );
  }
}

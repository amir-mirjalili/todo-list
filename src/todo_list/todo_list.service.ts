import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoList } from './schemas/todo_list.schema';
import { Model } from 'mongoose';
import { CreateTodoListDto } from './dto/todo_list.insert.dto';

@Injectable()
export class TodoListService {
  constructor(
    @InjectModel(TodoList.name) private todoListModel: Model<TodoList>,
  ) {}

  async create(data: CreateTodoListDto) {
    try {
      const todoListModel = await this.todoListModel.create({
        duoDate: data.dueDate,
        taskName: data.taskName,
        status: data.status,
        note: data.note,
      });
      return todoListModel.save();
    } catch (e) {
      console.log(e);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoList } from './schemas/todo_list.schema';
import { Model } from 'mongoose';
import { CreateTodoListDto } from './dto/todo_list.insert.dto';
import { UpdateTodoListDto } from './dto/todo_list.update.dto';

@Injectable()
export class TodoListService {
  constructor(
    @InjectModel(TodoList.name) private todoListModel: Model<TodoList>,
  ) {}

  async create(data: CreateTodoListDto) {
    try {
      return this.todoListModel.create({
        duoDate: data.dueDate,
        taskName: data.taskName,
        status: data.status,
        note: data.note,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id: string) {
    try {
      const todoList = await this.todoListModel.findById(id);
      if (!todoList) throw new Error('item not found');
      return todoList;
    } catch (e) {
      console.log(e);
    }
  }

  async getAll() {
    try {
      return this.todoListModel.find();
    } catch (e) {
      console.log(e);
    }
  }

  async updateById(id: string, data: UpdateTodoListDto) {
    try {
      return this.todoListModel.updateOne(
        { _id: id },
        { duoDate: data.dueDate, taskName: data.taskName, status: data.status },
      );
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: string) {
    try {
      return this.todoListModel.deleteOne({ _id: id });
    } catch (e) {
      console.log(e);
    }
  }
}

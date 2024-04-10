import { Test, TestingModule } from '@nestjs/testing';
import { TodoListService } from './todo_list.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList } from './schemas/todo_list.schema';
import { CreateTodoListDto } from './dto/todo_list.insert.dto';
import { TodoStatus } from './schemas/todo_list.status.enum';
import { UpdateTodoListDto } from './dto/todo_list.update.dto';

const mockTodoListModel = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn(),
};

describe('TodoListService', () => {
  let service: TodoListService;
  let todoListModel: Model<TodoList>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoListService,
        {
          provide: getModelToken(TodoList.name),
          useValue: mockTodoListModel,
        },
      ],
    }).compile();

    service = module.get<TodoListService>(TodoListService);
    todoListModel = module.get<Model<TodoList>>(getModelToken(TodoList.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo list item', async () => {
    const createTodoListDto: CreateTodoListDto = {
      dueDate: new Date(),
      taskName: 'Test Task',
      status: TodoStatus.Pending,
      note: 'Test Note',
    };

    const expectedTodoListItem = {
      _id: 'some_id',
      duoDate: createTodoListDto.dueDate,
      taskName: createTodoListDto.taskName,
      status: createTodoListDto.status,
      note: createTodoListDto.note,
    };

    mockTodoListModel.create.mockReturnValueOnce(expectedTodoListItem);

    const result = await service.create(createTodoListDto);

    expect(result).toEqual(expectedTodoListItem);
  });

  it('should handle errors during creation', async () => {
    const createTodoListDto: CreateTodoListDto = {
      dueDate: new Date(),
      taskName: 'Test Task',
      status: TodoStatus.Pending,
      note: 'Test Note',
    };

    const error = new Error('Something went wrong');

    mockTodoListModel.create.mockRejectedValueOnce(error);

    await expect(service.create(createTodoListDto)).rejects.toThrow(error);
  });

  it('should return all todo list items', async () => {
    const mockTodoListItems = [
      { _id: '1', taskName: 'Task 1' },
      { _id: '2', taskName: 'Task 2' },
    ];

    mockTodoListModel.find.mockReturnValueOnce(mockTodoListItems);

    const result = await service.getAll();

    expect(result).toEqual(mockTodoListItems);
    expect(todoListModel.find).toHaveBeenCalled();
  });

  it('should return by id todo list item', async () => {
    const mockTodoListItems = { _id: '1', taskName: 'Task 1' };

    mockTodoListModel.findById.mockReturnValueOnce(mockTodoListItems);

    const result = await service.getById(mockTodoListItems._id);

    expect(result).toEqual(mockTodoListItems);
    expect(todoListModel.findById).toHaveBeenCalled();
  });

  it('should update todo list item', async () => {
    const mockTodoListItems = { _id: '1', taskName: 'Task 1' };

    mockTodoListModel.updateOne.mockReturnValueOnce(mockTodoListItems);

    const todoListUpdateDTO: UpdateTodoListDto = {
      taskName: 'Test',
      status: TodoStatus.InProgress,
      note: 'Test',
      dueDate: new Date('2000-01-01'),
    };
    const result = await service.updateById(
      mockTodoListItems._id,
      todoListUpdateDTO,
    );

    expect(result).toEqual(mockTodoListItems);
    expect(todoListModel.updateOne).toHaveBeenCalled();
  });

  it('should delete todo list item', async () => {
    const mockTodoListItems = { _id: '1', taskName: 'Task 1' };

    mockTodoListModel.deleteOne.mockReturnValueOnce(mockTodoListItems);

    const result = await service.delete(mockTodoListItems._id);

    expect(result).toEqual(mockTodoListItems);
    expect(todoListModel.deleteOne).toHaveBeenCalled();
  });
});

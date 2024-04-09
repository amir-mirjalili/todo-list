import { Test, TestingModule } from '@nestjs/testing';
import { TodoListService } from './todo_list.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoList } from './schemas/todo_list.schema';
import { CreateTodoListDto } from './dto/todo_list.insert.dto';

const mockTodoListModel = {
  create: jest.fn(),
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

  describe('create', () => {
    it('should create a todo list item', async () => {
      const createTodoListDto: CreateTodoListDto = {
        dueDate: new Date(),
        taskName: 'Test Task',
        status: 'Pending',
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
        status: 'Pending',
        note: 'Test Note',
      };

      const error = new Error('Something went wrong');

      mockTodoListModel.create.mockRejectedValueOnce(error);

      await expect(service.create(createTodoListDto)).rejects.toThrow(error);
    });
  });
});

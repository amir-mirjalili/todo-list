import { IsNotEmpty, IsOptional, IsEnum, IsString } from 'class-validator';
import { TodoStatus } from '../schemas/todo_list.status.enum';

export class CreateTodoListDto {
  @IsNotEmpty()
  taskName: string;

  @IsNotEmpty()
  @IsString()
  dueDate: Date;

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @IsOptional()
  note: string;
}

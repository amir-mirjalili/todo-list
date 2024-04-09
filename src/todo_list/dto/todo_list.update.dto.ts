import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TodoStatus } from '../schemas/todo_list.status.enum';

export class UpdateTodoListDto {
  @IsOptional()
  taskName: string;

  @IsOptional()
  @IsString()
  dueDate: Date;

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus;

  @IsOptional()
  note: string;
}

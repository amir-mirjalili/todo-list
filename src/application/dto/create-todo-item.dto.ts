import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  @IsString()
  description: string;
  @IsNumber()
  @IsNotEmpty({ message: 'Priority is required' })
  priority: number;
  @IsString()
  @IsNotEmpty({ message: 'TodoListId is required' })
  todoListId: string;
}

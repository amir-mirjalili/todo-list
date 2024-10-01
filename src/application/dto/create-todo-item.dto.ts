import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty({ message: 'TodoListId is required' })
  todoListId: string;
}

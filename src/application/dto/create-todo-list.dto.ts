import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  @IsString()
  @IsNotEmpty({ message: 'UserId is required' })
  userId: string;
}

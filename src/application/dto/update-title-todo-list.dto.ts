import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTitleTodoListDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
}

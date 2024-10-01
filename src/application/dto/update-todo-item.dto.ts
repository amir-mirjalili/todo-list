import { IsOptional, IsString } from 'class-validator';

export class UpdateTodoItemDto {
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
}

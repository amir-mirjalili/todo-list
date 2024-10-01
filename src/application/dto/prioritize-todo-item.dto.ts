import { IsNotEmpty, IsNumber } from 'class-validator';

export class PrioritizeTodoItemDto {
  @IsNotEmpty({ message: 'Priority is required' })
  @IsNumber()
  priority: number;
}

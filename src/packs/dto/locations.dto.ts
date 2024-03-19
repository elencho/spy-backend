import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  title: string;
}

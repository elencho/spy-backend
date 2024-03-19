import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateLocationDto } from './locations.dto';

export class CreatePackDto {
  @IsNotEmpty()
  title: string;
}

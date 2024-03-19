import { IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  deviceId: string;
}

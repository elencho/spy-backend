import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AuthCredentialsDto } from 'src/dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { deviceId } = AuthCredentialsDto;
    return this.authService.createUser(deviceId);
  }
  
}

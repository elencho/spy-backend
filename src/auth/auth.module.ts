import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DeviceAuthStrategy } from './device-auth.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, DeviceAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

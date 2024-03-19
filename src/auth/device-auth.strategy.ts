// device-auth.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { AuthService } from './auth.service';

@Injectable()
export class DeviceAuthStrategy extends PassportStrategy(Strategy, 'device') {
  static key = 'device';
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(request: any, done: Function) {
    try {
      const deviceId = request.headers['device-id']; // Assuming device ID is passed in headers
      if (!deviceId) {
        throw new UnauthorizedException('Device ID not provided');
      }

      // Check if the device ID is valid
      const isValid = await this.authService.validateUserByDeviceId(deviceId);
      if (!isValid) {
        throw new UnauthorizedException('Invalid device ID');
      }

      // If validation succeeds, return the user
      done(null, isValid);
    } catch (error) {
      // If an error occurs during validation, pass it to Passport
      done(error, false);
    }
  }
}

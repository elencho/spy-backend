import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './pack.entity';
import { Repository } from 'typeorm';
import { CreatePackDto } from './dto/create-pack.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { PacksService } from './packs.service';
import { CreateLocationDto } from './dto/locations.dto';
import { AuthGuard } from '@nestjs/passport';
import { DeviceAuthStrategy } from 'src/auth/device-auth.strategy';

@Controller('packs')
@UseGuards(AuthGuard(DeviceAuthStrategy.key))
export class PacksController {
  private logger = new Logger('PacksController', { timestamp: true });

  constructor(private packsService: PacksService) {}

  @Post('/create')
  createPack(
    @Body() createPackDto: CreatePackDto,
    @GetUser() user: User,
  ): Promise<Pack> {
    return this.packsService.createPack(createPackDto, user);
  }

  @Post('/createLocation')
  addLocation(
    @Body() createLocationDto: CreateLocationDto,
    @GetUser() user: User,
  ): Promise<Pack> {
    return this.packsService.createPack(createLocationDto, user);
  }

  @Get()
  getPacks(@GetUser() user: User): Promise<Pack[]> {
    this.logger.verbose(`User "${user.deviceId}" retrieving all packs`);
    return this.packsService.getPacks(user);
  }
}

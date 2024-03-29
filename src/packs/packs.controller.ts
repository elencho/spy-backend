import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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
import { Location } from './locations.entity';

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
  ): Promise<Location> {
    const { title, packId } = createLocationDto;

    return this.packsService.addLocation(title, packId, user);
  }

  @Get('/locations/:packId')
  getLocationsByPackId(
    @Param('packId') packId: string,
    @GetUser() user: User,
  ): Promise<Location[]> {
    return this.packsService.getLocationsByPackId(packId, user);
  }

  @Get()
  getPacks(@GetUser() user: User): Promise<Pack[]> {
    this.logger.verbose(`User "${user.deviceId}" retrieving all packs`);
    return this.packsService.getPacks(user);
  }

  @Get('/:id')
  getPackById(@GetUser() user: User, @Param('id') id: string): Promise<Pack> {
    return this.packsService.getPackById(id, user);
  }

}

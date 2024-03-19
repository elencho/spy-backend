import { Body, Controller, Logger, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './pack.entity';
import { Repository } from 'typeorm';
import { CreatePackDto } from './dto/create-pack.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { PacksService } from './packs.service';

@Controller('packs')
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
}

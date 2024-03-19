import { Module } from '@nestjs/common';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';

@Module({
  providers: [PacksService],
  controllers: [PacksController]
})
export class PacksModule {}

import { Module } from '@nestjs/common';
import { PacksService } from './packs.service';
import { PacksController } from './packs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pack } from './pack.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Location } from './locations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pack, Location]), AuthModule],
  providers: [PacksService],
  controllers: [PacksController],
})
export class PacksModule {}

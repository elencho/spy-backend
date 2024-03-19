import { Injectable } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './pack.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PacksService {
  constructor(
    @InjectRepository(Pack)
    private packRepository: Repository<Pack>,
  ) {}

  async createPack(createPackDto: CreatePackDto, user: User): Promise<Pack> {
    const { title } = createPackDto;

    const pack = this.packRepository.create({
      title,
      user,
    });

    this.packRepository.save(pack);
    return pack;
  }
}

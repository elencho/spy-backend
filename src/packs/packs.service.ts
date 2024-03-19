import { Injectable } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './pack.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/locations.dto';

@Injectable()
export class PacksService {
  constructor(
    @InjectRepository(Pack)
    private packRepository: Repository<Pack>,
  ) {}

  async createPack(createPackDto: CreatePackDto, user: User): Promise<Pack> {
    const { title } = createPackDto;
    console.log(user);
    const pack = this.packRepository.create({
      title,
      user,
    });

    this.packRepository.save(pack);
    return pack;
  }

  async getPacks(user: User): Promise<Pack[]> {
    const packs = await this.packRepository.find({ where: { user } });
    return packs;
  }

  //   async addLocation(createLocation: CreateLocationDto, pack: Pack): Promise<Pack> {
  //     const { title } = createPackDto;

  //     const packWithLocation = this.packRepository.create({
  //       title,
  //       pack,
  //     });

  //     this.packRepository.save(packWithLocation);
  //     return pack;
  //   }
}

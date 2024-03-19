import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackDto } from './dto/create-pack.dto';
import { User } from 'src/auth/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from './pack.entity';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/locations.dto';
import { Location } from './locations.entity';

@Injectable()
export class PacksService {
  constructor(
    @InjectRepository(Pack)
    private packRepository: Repository<Pack>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async createPack(createPackDto: CreatePackDto, user: User): Promise<Pack> {
    const { title } = createPackDto;
    const pack = this.packRepository.create({
      title,
      locations: [],
      user,
    });

    this.packRepository.save(pack);
    return pack;
  }

  async getPacks(user: User): Promise<Pack[]> {
    const packs = await this.packRepository.find({ where: { user } });
    return packs;
  }

  async getPackById(id: string, user: User): Promise<Pack> {
    const pack = await this.packRepository.findOneBy({ id, user });

    if (!pack) {
      throw new NotFoundException(`Pack with ID "${id}" not found`);
    }

    return pack;
  }

  async addLocation(
    title: string,
    packId: string,
    user: User,
  ): Promise<Location> {
    let foundPack = await this.getPackById(packId, user);

    const location = this.locationRepository.create({ title, pack: foundPack });
    this.locationRepository.save(location);
    return location;
  }

  async getLocationsByPackId(packId: string, user: User): Promise<Location[]> {
    const foundPack = await this.getPackById(packId, user);
    const locations = await this.locationRepository.find({
      where: { pack: foundPack },
    });
    
    return locations;
  }
}

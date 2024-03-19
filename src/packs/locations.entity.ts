import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { Pack } from './pack.entity';

@Entity()
export class Location {
  @PrimaryColumn()
  title: string;

  @ManyToOne(() => Pack, (pack) => pack.locations)
  pack: Pack;
}

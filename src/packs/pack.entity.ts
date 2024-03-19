import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
import { Location } from './locations.entity';

@Entity()
export class Pack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Location, (location) => location.pack)
  locations: Location[];

  @ManyToOne((_type) => User, (user) => user.packs, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}

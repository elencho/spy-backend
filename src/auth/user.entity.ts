// import { Task } from 'src/tasks/task.entity';
import { Pack } from 'src/packs/pack.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  deviceId: string;

  @OneToMany((_type) => Pack, (task) => task.user, { eager: true })
  packs: Pack[];
}

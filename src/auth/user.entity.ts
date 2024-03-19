// import { Task } from 'src/tasks/task.entity';
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

  //   @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  //   tasks: Task[];
}

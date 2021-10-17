/* eslint-disable no-console */
import {
  Column,
  Entity,
  OneToMany,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from '@reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id: ' + this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id: ' + this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id: ' + this.id);
  }
}

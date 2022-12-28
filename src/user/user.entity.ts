/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['nickname'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  detail_address: string;

  @Column()
  gu: string;

  @Column()
  dong: string;

  @Column()
  bank: string;

  @Column()
  account: string;

  @Column()
  holder: string;

  @Column({ default: 1000 })
  current_point: number;

  @Column({ default: new Date().toLocaleDateString() })
  date: string;
}

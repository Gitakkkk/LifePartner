import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() location: string;
  @Column() detail_location: string;
  @Column() gu: string;
  @Column() dong: string;
  @Column() price: number;
  @Column() period: string;
  @Column() use_point: number;
  @Column() title: string;
  @Column() contents: string;
  @Column() post_bank: string;
  @Column() post_account: string;
  @Column() post_holder: string;
  @Column({ default: 'waiting' }) status: string;
  @Column() point_earned: number;
  @Column() partner: string;
  @Column() writer: string;
  @Column({ default: new Date().toLocaleDateString() }) date: string;
}

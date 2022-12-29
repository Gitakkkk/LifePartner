import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Partner extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() article_id: number;
  @Column() partner: string;
  @Column({ default: new Date().toLocaleDateString() }) date: string;
}

import { Type } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: true })
  @Type(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ select: false })
  @Type(() => Date)
  updatedAt: Date;
}

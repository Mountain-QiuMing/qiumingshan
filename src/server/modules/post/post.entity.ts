import { Tag } from '@/modules/tag/tag.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  title: string;

  @Column('longtext')
  body: string;

  @ManyToMany(() => Tag, tag => tag.posts)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinTable()
  user: UserEntity;

  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;
}

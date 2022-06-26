import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { PostEntity } from '../post/post.entity';

@Entity()
export class TagController {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => PostEntity, post => post.tags)
  posts: PostEntity[];
}

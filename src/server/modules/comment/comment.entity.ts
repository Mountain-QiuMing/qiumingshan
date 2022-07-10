import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../../core/entity/common.entity';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Entity()
export class Comment extends CommonEntity {
  @ManyToOne(() => UserEntity, user => user.comments, { onDelete: 'CASCADE', eager: true })
  user: UserEntity;

  @Column({ type: String, nullable: false })
  content: string;

  @ManyToOne(() => PostEntity, post => post.comments, { onDelete: 'CASCADE' })
  post: PostEntity;

  @ManyToOne(() => Comment, comment => comment.children, { nullable: true, onDelete: 'CASCADE' })
  parent?: Comment;

  @OneToMany(() => Comment, comment => comment.parent)
  children: Comment[];
}

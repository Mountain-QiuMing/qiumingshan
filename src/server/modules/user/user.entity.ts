import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PostEntity } from '../post/post.entity';
import { RoleEnum } from '../../core/constants/role';

@Entity({ name: 'user' })
@Unique(['email', 'username'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ length: 200, comment: '邮箱', select: false, unique: true })
  public email: string;

  @Column({ length: 10, comment: '用户名' })
  public username: string;

  @Column({ length: 80, comment: '密码', select: false })
  public password: string;

  @Column({ nullable: true, length: 30, comment: '昵称' })
  public nickname: string;

  @Column({ length: 200, comment: '用户主页' })
  public url: string;

  @Column({ nullable: true, length: 100, comment: '头像' })
  public avatar: string;

  @Column({ comment: '邮箱是否验证', type: 'boolean', default: false })
  public verified: boolean;

  // @Column({ comment: '邮箱验证随机数', length: 8 })
  // public randString: string;

  @Column({ comment: ' 上次登录时间', default: null })
  public lastLoginTime?: Date;

  @CreateDateColumn({ comment: '创建时间' })
  public createTime: Date;

  @UpdateDateColumn({ comment: '最后修改时间' })
  public updateTime: Date;

  @OneToMany(() => PostEntity, post => post.user)
  posts: PostEntity[];

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @BeforeInsert()
  async setUrl() {
    this.url = `https://mocro-light.com/user/${this.username}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

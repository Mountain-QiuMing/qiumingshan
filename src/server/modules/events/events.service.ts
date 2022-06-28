import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/user.entity';
import { Repository } from 'typeorm';
import { RoleEnum } from 'shared/constants/role.enum';
import { PostService } from '@/modules/post/post.service';

@Injectable()
export class EventsService {
  users: any[];
  constructor(
    private readonly postService: PostService,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {
    this.users = [];
  }

  addUser(user: any) {
    if (!this.users.find(item => user.userId === item.userId)) {
      this.users.push(user);

      return this.users;
    }
  }

  deleteUser(socketId: string) {
    const index = this.users.findIndex(item => item.socketId == socketId);

    this.users.splice(index, 1);
  }

  async publish(client: Socket, body: any) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const admin = await queryBuilder
      .leftJoinAndSelect('user.roles', 'role')
      .andWhere('role.code = :code', { code: RoleEnum.ADMIN })
      .getOne();

    if (admin) {
      const adminUser = this.users.find(item => item.userId === admin.id);

      if (adminUser) {
        client.to(adminUser.socketId).emit('audit', body);
      }
    }
  }

  async auditResult(client: Socket, body: any) {
    const { userId, data } = body;
    const user = this.users.find(item => item.userId === userId);

    if (user) {
      if (data) {
        await this.postService.store(data, { id: userId } as any);
      }
      client.to(user.socketId).emit('auditNotify', body);
    }
  }
}

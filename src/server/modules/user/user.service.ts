import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(userData: CreateUserDto) {
    const { email } = userData;
    const emailExist = await this.userRepository.findOneBy({ email });

    if (emailExist) {
      throw new BadRequestException('邮箱已被使用');
    }

    const { username } = userData;
    const usernameExist = await this.userRepository.findOneBy({ username });

    if (usernameExist) {
      throw new BadRequestException('用户名已存在');
    }

    const newUser = this.userRepository.create(userData);
    return await this.userRepository.save(newUser);
  }

  async verify(name: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder
      .where('user.email = :email', { email: name })
      .orWhere('user.username = :name', { name })
      .addSelect('user.password');

    return queryBuilder.getOne();
  }

  async verifyEmail(userData: UserEntity) {
    const user = await this.userRepository.findOneBy({ id: userData.id });
    if (user) {
      if (user.verified) {
        throw new HttpException('邮箱已被验证，请勿重复验证', 200);
      }
      return this.userRepository.update(userData.id, {
        verified: true,
      });
    } else {
      throw new BadRequestException('用户不存在');
    }
  }

  /** 通过用户 `id` 获取用户信息 */
  async getUserInfoById(id: string) {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('用户不存在');
    }

    return entity;
  }
}

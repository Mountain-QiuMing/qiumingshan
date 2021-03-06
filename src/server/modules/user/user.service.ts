import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '../../core/exception/api.exception';
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
  async getUserInfoById(id: string, email = false) {
    const queryBuilder = await this.userRepository.createQueryBuilder('user').where('user.id = :id', { id });

    if (email) {
      queryBuilder.addSelect('user.email');
    }

    const entity = await queryBuilder.getOne();

    if (!entity) {
      throw new NotFoundException('用户不存在');
    }

    return entity;
  }

  /** 通过用户名获取用户信息 */
  async getUserInfoByName(username: string, user: UserEntity) {
    console.log(user);
    const entity = await this.userRepository.findOne({
      where: { username },
      // select: email && ['email'],
    });

    if (!entity) {
      throw new NotFoundException('用户不存在');
    }

    return entity;
  }

  async updateUserInfoById(id: string, user: Partial<UserEntity>) {
    const entity = await this.userRepository.findOneBy({ id });

    if (!entity) {
      return new ApiException('用户不存在', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.update(id, user);
  }
}

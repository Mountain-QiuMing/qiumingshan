import { BadRequestException, Injectable } from '@nestjs/common';
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
}

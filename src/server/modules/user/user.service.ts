import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async create(userDto: CreateUserDto) {
    const newUser = await this.userRepository.create(userDto);
    return await this.userRepository.save(newUser);
  }

  async verify(name: string) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.where('user.email = :email', { email: name }).orWhere('user.username = :name', { name });

    return queryBuilder.getOne();
  }
}

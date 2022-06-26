import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async index(name?: string) {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.name like :name', { name: `%${name}%` })
      .take(10)
      .getMany();
  }

  async findRecommendList() {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.posts', 'posts')
      .select('tag.id', 'id')
      .addSelect('tag.name', 'name')
      .addSelect('COUNT(posts.id)', 'postCount')
      .groupBy('tag.id')
      .orderBy({ postCount: 'DESC' })
      .limit(5)
      .getRawMany();
  }

  async store(tag: CreateTagDto) {
    return await this.tagRepository.save(tag);
  }

  async update(id: string, tag: Partial<CreateTagDto>) {
    return await this.tagRepository.update(id, tag);
  }

  async delete(id: string) {
    return await this.tagRepository.delete(id);
  }
}

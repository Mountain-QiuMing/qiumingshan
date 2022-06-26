import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity as Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Tag } from '../tag/tag.entity';
import { ListOptionsInterface } from '../../core/decorator/list-options.decorator';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async beforeTag(tags: Array<Partial<Tag>>) {
    const _tags = tags.map(async item => {
      const { id, name } = item;

      if (id) {
        const _tag = await this.tagRepository.findOneBy({ id });

        if (_tag) {
          return _tag;
        }

        return;
      }

      if (name) {
        const _tag = await this.tagRepository.findOneBy({ name });

        if (_tag) {
          return _tag;
        }

        return await this.tagRepository.save(item);
      }
    });

    return Promise.all(_tags);
  }

  async store(post: CreatePostDto, user: UserEntity) {
    const { tags } = post;

    if (tags) {
      post.tags = await this.beforeTag(tags);
    }

    // delete post.categoryId;

    return await this.postRepository.save({
      ...post,
      user,
    });
  }

  async index(body: ListOptionsInterface, postId?: string) {
    const { tagIds, pageNum, pageSize, sort, order } = body;
    const queryBuilder = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .select(['post', 'user.username', 'user.id', 'user.avatar', 'user.nickname'])
      .leftJoin('post.tags', 'tags');

    if (postId) {
      queryBuilder.andWhereInIds([postId]);

      return queryBuilder.getOne();
    }

    if (tagIds) {
      queryBuilder.andWhere('tag.id IN (:...tagIds)', { tagIds });
    }

    queryBuilder.take(pageSize).skip(pageSize * (pageNum - 1));

    queryBuilder.orderBy({
      [`post.${sort}`]: order,
    });

    const [data, totalSize] = await queryBuilder.getManyAndCount();

    return {
      data,
      page: {
        pageSize,
        pageNum,
        totalSize,
      },
      sort,
      order,
    };
  }

  async show(id: string) {
    return await this.postRepository.findOneBy({ id });
  }

  async update(id: string, post: Partial<CreatePostDto>) {
    const { tags } = post;

    delete post.tags;

    if (await this.postRepository.findOneBy({ id })) {
      if (Object.keys(post).length) {
        await this.postRepository.update(id, post);
      }
    } else {
      throw new NotFoundException('文章不存在，请检查id');
    }

    const entity = await this.postRepository.findOneBy({ id });

    // const entity = await this.postRepository.findOne({ id }, {
    //   relations: ['tags'],
    // });

    if (tags) {
      entity.tags = await this.beforeTag(tags);
    }

    return await this.postRepository.save(entity);
  }

  async delete(id: string) {
    return await this.postRepository.delete(id);
  }

  async collect(id: string, user: CreateUserDto) {
    await this.postRepository.createQueryBuilder().relation(UserEntity, 'collections').of(user).add(id);
  }

  async unCollect(id: string, user: CreateUserDto) {
    return await this.postRepository.createQueryBuilder().relation(UserEntity, 'collections').of(user).remove({ id });
  }

  async collecteds(id: string) {
    return await this.postRepository.createQueryBuilder().relation(Post, 'collecteds').of(id).loadMany();
  }
}

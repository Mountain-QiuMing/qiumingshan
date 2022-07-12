import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostEntity } from '../post/post.entity';
import { ApiException } from '../../core/exception/api.exception';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async get(postId: string) {
    const queryBuilder = this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.post.id = :postId', { postId })
      .select(['comment'])
      .leftJoin('comment.post', 'post')
      .addSelect('comment.post.id', 'postId')
      .leftJoinAndSelect('comment.user', 'user');
    return await queryBuilder.getMany();
  }

  async store({ postId, content, commentId }: CreateCommentDto, user) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post) {
      throw new ApiException('文章id不存在', HttpStatus.NOT_FOUND);
    }
    const comment = this.commentRepository.create({
      content,
      post,
      user,
    });

    if (commentId) {
      const parentComment = await this.commentRepository.findOneBy({ id: commentId });
      if (!parentComment) {
        throw new ApiException('父级评论id不存在', HttpStatus.NOT_FOUND);
      }
      comment.parent = parentComment;
    }
    return await this.commentRepository.save(comment);
  }

  async remove(commentId: string, userId: string) {
    const comment = await this.commentRepository.findOneBy({ id: commentId });
    if (!comment) {
      throw new ApiException('要删除的评论不存在', HttpStatus.NOT_FOUND);
    }

    if (comment.user.id !== userId) {
      throw new ApiException('无法删除他人的评论', HttpStatus.UNAUTHORIZED);
    }

    return await this.commentRepository.delete(commentId);
  }
}

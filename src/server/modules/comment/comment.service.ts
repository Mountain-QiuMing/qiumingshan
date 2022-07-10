import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async store(userId: string, comment: CreateCommentDto) {
    const entity = this.commentRepository.create({
      user: { id: userId },
      post: {
        id: comment.postId,
      },
      content: comment.content,
    });
    return await this.commentRepository.save(entity);
  }
}

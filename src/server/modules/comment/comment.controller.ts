import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../../core/guard/jtw.guard';
import { User } from '../../core/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async store(@Body() comment: CreateCommentDto, @User() user: UserEntity) {
    return await this.commentService.store(user.id, comment);
  }
}

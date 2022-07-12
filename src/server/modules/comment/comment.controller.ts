import { Controller, Post, Body, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../../core/guard/jtw.guard';
import { User } from '../../core/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('api/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('post/:id')
  async get(@Param('id') id: string) {
    return await this.commentService.get(id);
  }

  @Post('post')
  @UseGuards(new JwtAuthGuard())
  async store(@Body() comment: CreateCommentDto, @User() user: UserEntity) {
    return await this.commentService.store(comment, user);
  }

  @Delete('post/:id')
  @UseGuards(new JwtAuthGuard())
  async remove(@Param('id') id: string, @User() user: UserEntity) {
    return await this.commentService.remove(id, user.id);
  }
}

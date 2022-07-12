import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PostEntity } from '../post/post.entity';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Comment, PostEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}

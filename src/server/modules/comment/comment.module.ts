import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class ReactionModule {}

import { AuthModule } from '@/modules/auth/auth.module';
import { Tag } from '@/modules/tag/tag.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PostEntity, Tag])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}

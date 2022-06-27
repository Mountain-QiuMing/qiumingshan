import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ListOptions, ListOptionsInterface } from '@/core/decorator/list-options.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '@/core/decorator/user.decorator';
import { JwtAuthGuard } from '@/core/guard/jtw.guard';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(new JwtAuthGuard())
  async store(@Body() post: CreatePostDto, @User() user) {
    return await this.postService.store(post, user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async index(@ListOptions() options: ListOptionsInterface) {
    return await this.postService.index(options);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.postService.index({} as any, id);
  }

  @Put(':id')
  @UseGuards(new JwtAuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  async update(@Param('id') id: string, @Body() post: Partial<CreatePostDto>) {
    return await this.postService.update(id, post);
  }

  @Delete(':id')
  @UseGuards(new JwtAuthGuard())
  async delete(@Param('id') id: string) {
    return await this.postService.delete(id);
  }
}

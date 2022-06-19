import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async index() {
    return await this.postService.getAllPosts();
  }

  @Get(':id')
  public async get(@Param('id') slug: string) {
    const post = await this.postService.find(slug);

    if (post === null) {
      throw new NotFoundException();
    }

    return { post };
  }
}
